import { Component, AfterViewInit } from '@angular/core';
import { faCar, faCity, faHome, faInfinity, faSearch, faSearchLocation, faUser } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { interval } from 'rxjs';
import { City, Parking, ParkingSearchService, ParkingSpot } from 'src/app/pages/parking-search/parking-search-services/parking-search.service';
import { SharedSelectedCityService } from 'src/app/services/shared-selected-city.service';

@Component({
  selector: 'app-parking-search',
  templateUrl: './parking-search.component.html',
  styleUrls: ['./parking-search.component.css']
})
export class ParkingSearchComponent implements AfterViewInit {

  // font awsome icons
  faCity = faCity;
  faCar = faCar;
  faSearchLocation = faSearchLocation;
  faHome = faHome;
  faInfinity = faInfinity;

  // cities & parkings
  parkingSpots: ParkingSpot[] = [];
  private selectedCity: City | undefined;
  private selectedParkingId: number | undefined;
  private availableParkings: Parking[] = [];

  // searchModes: false = current location, true = city center
  private currentLocationSearchEnabled: boolean = false;
  // current location unavailable
  currentLocationUnavailable: boolean = false;

  // locations
  private currentLocation: L.LatLng | undefined;
  private selectedCityLocation: L.LatLng | undefined;
  private searchRange = 1000;

  // markers
  private currentLocationMarker: L.Marker<any> | undefined;
  private searchRadiusMarker: L.Circle<any> | undefined;
  private cityCenterMarker: L.Marker<any> | undefined;
  private parkingsMarkers: L.Marker<any>[] = [];
  private parkingsSpotsMarkers: L.Marker<any>[] = [];

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
  private parkingGreen = L.icon({
    iconUrl: '/assets/images/park-green.png',
    iconSize: [20, 20]
  });
  private parkingRed = L.icon({
    iconUrl: '/assets/images/park-red.png',
    iconSize: [20, 20]
  });
  private parkingYellow = L.icon({
    iconUrl: '/assets/images/park-yellow.png',
    iconSize: [20, 20]
  });


  private map: any;

  constructor(private parkingSearchService: ParkingSearchService, private sharedService: SharedSelectedCityService) {
  }

  ngAfterViewInit(): void {
    this.initCitiesSelect();
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
    this.resetSpots();
    this.currentLocationSearchEnabled = true;
    this.locatePosition();
  }

  cityCenterMode() {
    this.resetSpots();
    this.currentLocationUnavailable = false;
    this.currentLocationSearchEnabled = false;
    this.locateCityCenter();
  }

  private resetSpots() {
    this.parkingSpots = [];
    this.selectedParkingId = undefined;
    this.clearParkingSpots();
  }

  onRangeChange(value: string) {
    switch (value) {
      case "1": this.searchRange = 500; break;
      case "2": this.searchRange = 1000; break;
      case "3": this.searchRange = 5000; break;
      case "4": this.searchRange = 10000; break;
      case "5": this.searchRange = 100000; break;
    }
    this.updateGraphics();
  }

  private initCitiesSelect() {
    this.sharedService.sharedParkingSearchSelectedCity.subscribe((city: City) => {
      const shouldPan = this.selectedCity != undefined;
      this.selectedCity = city;
      this.selectedCityLocation = new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude);
      this.updateGraphics();
      if(shouldPan) {
        this.map.panTo(new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude));
      }
  });
}

  private initMap(): void {
    this.map = L.map('map', {
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('locationfound', (e: { accuracy: any; latlng: L.LatLng; }) => {
      this.currentLocationUnavailable = false;
      this.currentLocation = e.latlng;
      this.updateGraphics();
    });

    this.map.on('locationerror', (e: { message: any; }) => {
      if (this.currentLocationSearchEnabled) {
        this.currentLocationUnavailable = true;
      }
    });

    this.currentLocationSearchEnabled = true;
    this.locatePosition();

    interval(8000)
    .subscribe(() => {
      this.updateParkingsStatus();
    });
  }

  private updateGraphics() {
    this.clearMarkers();
    this.updateCurrentLocationMarkers();
    this.updateCityCenterMarkers();
    this.updateSearchRadiusMarkers();
    this.updateParkingMarkers();
    this.updateParkingSpotsMarkers();
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
    if (this.searchRange != 100000) {
      if (this.currentLocationSearchEnabled && this.currentLocation) {
        this.searchRadiusMarker = L.circle(this.currentLocation, this.searchRange, { color: "#ff2c61", opacity: .5, fill: false }).addTo(this.map);
      } else if (this.selectedCityLocation) {
        this.searchRadiusMarker = L.circle(this.selectedCityLocation, this.searchRange, { color: "#ff2c61", opacity: .5, fill: false }).addTo(this.map);
      }
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
        .bindPopup('<div class="d-flex justify-content-center"><b> Free Spots: ' + availableSpots + '</div></p><div class="d-flex justify-content-center"><button class="btn-info popup-button" onclick="window.location.href=' + "'" + "/parking/" + this.selectedCity?.name + "/" + parking.id + "'" +  ' ">More Info</button><div>')
        .addEventListener("click", e => {
          this.selectedParkingId = parking.id;
          this.parkingSpots = parking.parkingSpots;
          this.clearParkingSpots();
          this.updateParkingSpotsMarkers();
        })
        .addTo(this.map)
      this.parkingsMarkers.push(marker);
    });
  }

  private updateParkingSpotsMarkers() {
    if (this.parkingSpots) {
      this.parkingSpots.forEach((spot: ParkingSpot) => {
        let options;
        if (spot.occupied && spot.paidFor) {
          options = { icon: this.parkingRed };
        } else if(spot.occupied){
          options = { icon: this.parkingYellow };
        } else {
          options = { icon: this.parkingGreen };
        }
        const marker = L.marker(new L.LatLng(spot.latitude, spot.longitude), options)
          .addTo(this.map);
        this.parkingsSpotsMarkers.push(marker);
      });
    }
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
    this.clearParkingSpots();
  }

  private clearParkingSpots() {
    if (this.parkingsSpotsMarkers.length) {
      this.parkingsSpotsMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
    }
  }

  private updateParkingsStatus() {
    if(this.selectedCity && this.selectedParkingId) {
      this.parkingSearchService.getParkingByParkingId(this.selectedCity.name, this.selectedParkingId)
      .subscribe((data: Parking) => {
        this.parkingSpots = data.parkingSpots;
        this.updateParkingSpotsMarkers();
      });
    }
  }

}
