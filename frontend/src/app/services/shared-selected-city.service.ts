import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { City } from '../pages/parking-search/parking-search-services/parking-search.service';

@Injectable({
  providedIn: 'root'
})
export class SharedSelectedCityService {

  private parkingSearchSelectedCity = new Subject<City>();
  sharedParkingSearchSelectedCity = this.parkingSearchSelectedCity.asObservable();

  constructor() { }

  emitParkingSearchSelectedCity(selectedCity: City) {
    this.parkingSearchSelectedCity.next(selectedCity);
  }
}
