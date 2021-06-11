import { Component, OnInit } from '@angular/core';
import { City, ParkingSearchService } from 'src/app/services/parking-search.service';
import { SharedSelectedCityService } from 'src/app/services/shared-selected-city.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  availableCities: City[] = [];
  private selectedCity: City | undefined;

  constructor(private parkingSearchService: ParkingSearchService, private sharedService: SharedSelectedCityService) { }

  ngOnInit(): void {
    this.initCities();
  }

  private initCities() {
    this.parkingSearchService.getAllCities().subscribe((cities: City[]) => {
      this.availableCities = cities;
      this.initDefaultCity();
    }, (err) => console.error(err))
  }

  private initDefaultCity() {
    const defaultCityName = 'cesena';
    this.selectedCity = this.availableCities.find((city: City) => city.name == defaultCityName);
    if (this.selectedCity) {
      this.sharedService.emitParkingSearchSelectedCity(this.selectedCity);
    }
  }

  onSearchCityChange(value: string) {
    this.selectedCity = this.availableCities.find((city: City) => city.name == value);
    if (!this.selectedCity) {
      console.error("Could not retrieve the selected city: " + value);
    } else {
      this.sharedService.emitParkingSearchSelectedCity(this.selectedCity);
    }
  }

}
