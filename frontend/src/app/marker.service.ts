import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(
    private http: HttpClient,
    private popupService: PopupService) { }

  makeCapitalMarkers(map: L.Map): void {
      this.http.get(this.capitals).subscribe((res: any) => {
      const parkingInfo = ['Colosseo', 15, 57, '09-18', 150, '00-24', 0]
      const marker = L.marker([41.89049, 12.4942]);
      marker.bindPopup(this.popupService.makeCapitalPopup(parkingInfo));
      marker.addTo(map);
    });
  }
}
