import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingSearchService {


  private citiesUrl = environment.baseUrl + "/city";
  private parkingsUrl = environment.baseUrl + "/parking";

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

  getParkingByCityNameAndParkingId(cityName: string, parkingId: number) {
    const url = this.parkingsUrl + "/spots/" + cityName + "/" + parkingId;
    return this.http.get<Parking>(url);
  }

}

export type City = {
  name: string,
  longitude: number,
  latitude: number,
  parkings: Parking[]
}

export type Parking = {
  id: number,
  capacity: number,
  occupancy: number,
  longitude: number,
  latitude: number,
  parkingSpots: ParkingSpot[]
  detail: ParkingDetail,
  pricing: ParkingPricing
}

export type ParkingSpot = {
  occupied: boolean,
  paidFor: boolean,
  longitude: number,
  latitude: number
}

export type ParkingDetail = {
  name: string,
  address: string,
  type: string,
  imageUrl: string
}

export type ParkingPricing = {
  days: string,
  hours: string,
  price: number
}
