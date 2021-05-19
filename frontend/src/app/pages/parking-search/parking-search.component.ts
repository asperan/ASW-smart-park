import { Component, AfterViewInit } from '@angular/core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-parking-search',
  templateUrl: './parking-search.component.html',
  styleUrls: ['./parking-search.component.css']
})
export class ParkingSearchComponent implements AfterViewInit {

  faUser = faUser;
  faSearch = faSearch;

  private map: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 41.890572, 12.494314],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  
}
