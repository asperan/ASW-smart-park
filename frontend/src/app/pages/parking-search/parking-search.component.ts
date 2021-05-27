import { Component, AfterViewInit } from '@angular/core';
import { faCar, faCity, faHome, faSearch, faSearchLocation, faUser } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { City, Parking, ParkingSearchService } from 'src/app/services/parking-search.service';

@Component({
  selector: 'app-parking-search',
  templateUrl: './parking-search.component.html',
  styleUrls: ['./parking-search.component.css']
})
export class ParkingSearchComponent implements AfterViewInit {

  // font awsome icons
  faUser = faUser;
  faSearch = faSearch;
  faCity = faCity;
  faCar = faCar;
  faSearchLocation = faSearchLocation;
  faHome = faHome;

  // cities & parkings
  availableCities: City[] = [];
  private selectedCity: City | undefined;
  private availableParkings: Parking[] = [];

  // searchModes: false = current location, true = city center
  private currentLocationSearchEnabled: boolean = false;
  // current location unavailable
  currentLocationUnavailable:boolean = false;

  // locations
  private currentLocation: L.LatLng| undefined;
  private selectedCityLocation: L.LatLng | undefined;
  private searchRange = 1000;

  // markers
    private currentLocationMarker: L.Marker<any> | undefined;
    private searchRadiusMarker: L.Circle<any> | undefined;
    private cityCenterMarker: L.Marker<any> | undefined;
    private parkingsMarkers: L.Marker<any>[] = [];

  // marker icons
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
    this.updateGraphics();
  }

  locateCityCenter() {
    if (this.selectedCity) {
      this.map.panTo(new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude));
      this.updateGraphics();
    }
  }

  currentLocationMode() {
    this.currentLocationSearchEnabled = true;
    this.locatePosition();
  }

  cityCenterMode() {
    this.currentLocationUnavailable = false;
    this.currentLocationSearchEnabled = false;
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
    this.updateGraphics();
  }

  onSearchCityChange(value: string) {
    this.selectedCity = this.availableCities.find((city: City) => city.name == value);
    if (!this.selectedCity) {
      console.error("Could not retrieve the selected city: " + value);
    } else {
      this.selectedCityLocation = new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude);
      this.updateGraphics();
      this.map.panTo(new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude));
    }
  }

  private initCities() {
    this.parkingSearchService.getAllCities().subscribe((cities: City[]) => {
      this.availableCities = cities;
      this.initDefaultCity();
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

    this.map.on('locationfound', (e: { accuracy: any; latlng: L.LatLng; }) => {
      this.currentLocationUnavailable = false;
      this.currentLocation = e.latlng;
      this.updateGraphics();
    });

    this.map.on('locationerror', (e: { message: any; }) => {
      if(this.currentLocationSearchEnabled) {
        this.currentLocationUnavailable = true;
      }
    });

    this.currentLocationSearchEnabled = true;
    this.locatePosition();
  }

  private initDefaultCity() {
    const defaultCityName = 'cesena';
    this.selectedCity = this.availableCities.find((city: City) => city.name == defaultCityName);
    if(this.selectedCity) {
      this.selectedCityLocation = new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude);
    }
  }

  private updateGraphics() {
    this.clearMarkers();
    this.updateCurrentLocationMarkers();
    this.updateCityCenterMarkers();
    this.updateSearchRadiusMarkers();
    this.updateParkingMarkers();
  }

  private updateCurrentLocationMarkers() {
    if (this.currentLocation) {
      this.currentLocationMarker = L.marker(this.currentLocation, { icon: this.navIcon }).addTo(this.map);
    }
  }

  private updateCityCenterMarkers() {
    if (this.selectedCityLocation) {
      this.cityCenterMarker = L.marker(this.selectedCityLocation, { icon: this.cityCenterIcon }).addTo(this.map);
    }
  }

  private updateSearchRadiusMarkers() {
    if (this.currentLocationSearchEnabled && this.currentLocation) {
      this.searchRadiusMarker = L.circle(this.currentLocation, this.searchRange, { color: "#ff2c61", opacity: .5, fill: false }).addTo(this.map);
    } else if(this.selectedCityLocation){
      this.searchRadiusMarker = L.circle(this.selectedCityLocation, this.searchRange, { color: "#ff2c61", opacity: .5, fill: false }).addTo(this.map);
    }
  }

  private updateParkingMarkers() {
    if (this.currentLocationSearchEnabled) {
      this.updateCurrentLocationModeParkings();
    } else {
      this.updateCityCenterModeParkings();
    }
  }

  private updateCurrentLocationModeParkings() {
    if (this.selectedCity && this.currentLocation) {
      this.parkingSearchService.getParkingsInRadiusPoint(this.selectedCity.name, this.currentLocation.lat, this.currentLocation.lng, this.searchRange / 1000).subscribe((data) => {
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
      if (parking.occupancy == parking.capacity) {
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
    if (this.parkingsMarkers.length) {
      this.parkingsMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
    }
  }

}
