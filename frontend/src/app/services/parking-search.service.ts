import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParkingSearchService {

  private baseUrl = "http://localhost:3000/api";
  private citiesUrl = this.baseUrl + "/city";
  private parkingsUrl = this.baseUrl + "/parking";

  constructor(private http: HttpClient) { }

  getAllCities() {
    const url = this.citiesUrl + "/all/";
    return this.http.get<City[]>(url);
  }

  suggestCity(partialName: string) {
    return this.http.get<City[]>(this.citiesUrl + "/suggest/" + partialName);
  }

  getParkingsInRadiusCityCenter(cityName: string, radiusKm: number) {
    const request = {
      "city": cityName,
      "radiusKM": radiusKm
    }
    return this.http.post<Parking[]>(this.parkingsUrl + "/radius-center/", request);
  }

  getParkingsInRadiusPoint(cityName: string, longitude: number, latitude: number, radiusKm: number) {
    const request = {
      "city": cityName,
      "radiusKM": radiusKm,
      "longitude": longitude,
      "latitude": latitude
    }
    return this.http.post<Parking[]>(this.parkingsUrl + "/radius/", request);
  }

}

export type City = {
  name: string,
  longitude: number,
  latitude: number,
  parkings: Parking[]
}

export type Parking = {
  capacity: number,
  occupancy: number,
  longitude: number,
  latitude: number
}
