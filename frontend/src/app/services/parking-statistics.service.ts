import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingStatisticsService {

  private parkingsUrl = environment.baseUrl + "/parking";

  constructor(private http: HttpClient) { }

  async getParkingStatistics(cityName: string, parkingId: number): Promise<any> {
    return this.http.get(this.parkingsUrl + "/statistics/" + cityName + "/" + parkingId).toPromise();
  }

}
