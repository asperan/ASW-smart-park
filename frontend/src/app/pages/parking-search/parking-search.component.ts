import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { City, Parking, ParkingSearchService } from 'src/app/services/parking-search.service';

@Component({
  selector: 'app-parking-search',
  templateUrl: './parking-search.component.html',
  styleUrls: ['./parking-search.component.css']
})
export class ParkingSearchComponent implements AfterViewInit {

  // TODO add "no parkings found in your search area in 'Cesena', please expand your search area or search from city center by pressing [icon]"
  // TODO maybe auto-select city based on location?

  faUser = faUser;
  faSearch = faSearch;

  availableCities: City[] = [];
  selectedCity: City | undefined;
  availableParkings: Parking[] = [];

  private locationSearchEnabled: boolean = false;

  private currentLocationMarker: L.Marker<any> | undefined;
  private searchRadiusMarker: L.Circle<any> | undefined;
  private cityCenterMarker: L.Marker<any> | undefined;
  private parkingsMarkers: L.Marker<any>[] = [];

  private searchLocation: L.LatLngExpression | undefined;
  private searchRange = 1000;

  private navIcon = L.icon({
    iconUrl: '/assets/images/nav-icon.png',
    iconSize: [35, 20]
  });
  private cityCenterIcon = L.icon({
    iconUrl: '/assets/images/city-center.png',
    iconSize: [35, 35]
  });
  private blueMarkerIcon = L.icon({
    iconUrl: '/assets/images/marker-blue.png',
    iconSize: [25, 35]
  });
  private yellowMarkerIcon = L.icon({
    iconUrl: '/assets/images/marker-yellow.png',
    iconSize: [25, 35]
  });
  private redMarkerIcon = L.icon({
    iconUrl: '/assets/images/marker-red.png',
    iconSize: [25, 35]
  });

  private map: any;

  constructor(private parkingSearchService: ParkingSearchService) {
  }

  ngAfterViewInit(): void {
    this.initCities();
    this.initMap();
  }

  locatePosition() {
    this.map.locate({ setView: true, maxZoom: 16 });
    this.updateMarkers();
  }

  locateCityCenter() {
    if (this.selectedCity) {
      this.searchLocation = new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude);
      this.map.panTo(new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude));
      this.updateMarkers();
    }
  }

  currentLocationMode() {
    this.locationSearchEnabled = true;
    this.locatePosition();
  }

  cityCenterMode() {
    this.locationSearchEnabled = false;
    this.locateCityCenter();
  }

  onRangeChange(value: string) {
    switch (value) {
      case "1": this.searchRange = 250; break;
      case "2": this.searchRange = 500; break;
      case "3": this.searchRange = 1000; break;
      case "4": this.searchRange = 5000; break;
      case "5": this.searchRange = 10000; break;
    }
    this.updateMarkers();
  }

  onSearchCityChange(value: string) {
    this.selectedCity = this.availableCities.find((city: City) => city.name == value);
    if (!this.selectedCity) {
      console.error("Could not retrieve the selected city: " + value);
    } else {
      this.updateMarkers();
      this.map.panTo(new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude));
    }
  }

  private initCities() {
    this.parkingSearchService.getAllCities().subscribe((cities: City[]) => {
      this.availableCities = cities;
    }, (err) => console.log(err))
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('locationfound', (e: { accuracy: any; latlng: L.LatLngExpression; }) => {
      this.searchLocation = e.latlng;
      this.updateMarkers();
    });

    this.map.on('locationerror', (e: { message: any; }) => {
      alert("Ooops, couldn't get your current position! Please re-try or select a city ;)");
    });

    this.locationSearchEnabled = true;
    this.locatePosition();
  }

  private updateMarkers() {
    if (this.searchLocation) {
      this.clearMarkers();
      this.updateCurrentLocationMarkers();
      this.updateCityCenterMarkers();
      this.updateParkingMarkers();
    }
  }

  private updateCurrentLocationMarkers() {
    if (this.searchLocation && this.locationSearchEnabled) {
      this.currentLocationMarker = L.marker(this.searchLocation, { icon: this.navIcon }).addTo(this.map);
      this.searchRadiusMarker = L.circle(this.searchLocation, this.searchRange, { color: "blue", opacity: .5, fill: false }).addTo(this.map);
    }
  }

  private updateCityCenterMarkers() {
    if (this.selectedCity) {
      const center = new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude);
      this.cityCenterMarker = L.marker(center, { icon: this.cityCenterIcon }).addTo(this.map);
      if (!this.locationSearchEnabled) {
        this.searchRadiusMarker = L.circle(center, this.searchRange, { color: "blue", opacity: .5, fill: false }).addTo(this.map);
      }
    }
  }

  private updateParkingMarkers() {
    if (this.locationSearchEnabled) {
      this.updateLocationModeParkings();
    } else {
      this.updateCityCenterModeParkings();
    }
  }

  private updateLocationModeParkings() {
    if (this.selectedCity) {
      this.parkingSearchService.getParkingsInRadiusPoint(this.selectedCity.name, this.selectedCity.longitude, this.selectedCity.latitude, this.searchRange / 1000).subscribe((data) => {
        this.availableParkings = data;
        this.displayParkings();
      }, (error) => {
        console.error(error);
      });
    }
  }

  private updateCityCenterModeParkings() {
    if (this.selectedCity) {
      this.parkingSearchService.getParkingsInRadiusCityCenter(this.selectedCity.name, this.searchRange / 1000).subscribe((data) => {
        this.availableParkings = data;
        this.displayParkings();
      }, (error) => {
        console.error(error);
      });
    }
  }

  private displayParkings() {
    this.availableParkings.forEach(parking => {
      let options;
      if(parking.occupancy == parking.capacity) {
        options = { icon: this.redMarkerIcon };
      } else if (parking.occupancy / parking.capacity * 100 >= 75) {
        options = { icon: this.yellowMarkerIcon };
      } else {
        options = { icon: this.blueMarkerIcon };
      }
      const availableSpots = parking.capacity - parking.occupancy;
      const marker = L.marker(new L.LatLng(parking.latitude, parking.longitude), options)
      .bindPopup('<div class="d-flex justify-content-center"><b> Free Spots: ' + availableSpots + '</div></p><div class="d-flex justify-content-center"><button class="btn-warning popup-button">Check Parking</button><div>')
      .addTo(this.map)
      this.parkingsMarkers.push(marker);
    });
  }

  private clearMarkers() {
    if (this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
    }
    if (this.searchRadiusMarker) {
      this.map.removeLayer(this.searchRadiusMarker);
    }
    if (this.cityCenterIcon) {
      this.map.removeLayer(this.cityCenterIcon);
    }
    if (this.cityCenterMarker) {
      this.map.removeLayer(this.cityCenterMarker);
    }
    if(this.parkingsMarkers.length) {
      this.parkingsMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
    }
  }

}
