import { Component, AfterViewInit } from '@angular/core';
import { faCircle, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-parking-search',
  templateUrl: './parking-search.component.html',
  styleUrls: ['./parking-search.component.css']
})
export class ParkingSearchComponent implements AfterViewInit {

  // TODO add button to geolocate
  // TODO fix marker not showing
  // TODO add range slider
  // TODO bind backend

  faUser = faUser;
  faSearch = faSearch;

  private currentLocationMarker: L.Marker<any> | undefined;
  private searchRadiusMarker: L.Circle<any> | undefined;

  private searchLocation: L.LatLngExpression | undefined;
  private searchRange = 1000;

  private navIcon = L.icon({
    iconUrl: '/assets/images/nav-icon.png',
    iconSize: [35, 20]
  });

  private map: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  locatePosition() {
    this.map.locate({ setView: true, maxZoom: 16 });
  }

  onRangeChange(value: string) {
    switch(value) {
      case "1": this.searchRange = 250; break;
      case "2": this.searchRange = 500; break;
      case "3": this.searchRange = 1000; break;
      case "4": this.searchRange = 5000; break;
      case "5": this.searchRange = 10000; break;
    }
    this.updateMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
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

    this.locatePosition();
  }

  private updateMarkers() {
    if(this.searchLocation) {
      this.clearMarkers();
      this.currentLocationMarker = L.marker(this.searchLocation, { icon: this.navIcon }).addTo(this.map);
      this.searchRadiusMarker = L.circle(this.searchLocation, this.searchRange, {color: "blue", opacity:.5, fill: false}).addTo(this.map);
    }
  }

  private clearMarkers() {
    if(this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
    }
    if(this.searchRadiusMarker) {
      this.map.removeLayer(this.searchRadiusMarker);
    }
  }

}
