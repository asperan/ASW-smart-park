import { Component, OnInit } from '@angular/core';
import { VehicleInfoService } from '../user-services/vehicle-info.service';

@Component({
  selector: 'app-vehicle-tab',
  templateUrl: './vehicle-tab.component.html',
  styleUrls: ['./vehicle-tab.component.css']
})
export class VehicleTabComponent implements OnInit {

  userVehicles: Array<{vehicleId: string, name: string}>;
  filteredVehicleList: Array<{vehicleId: string, name: string}>;

  constructor(private vehicleInfoService: VehicleInfoService) { 
    this.userVehicles = [];
    this.filteredVehicleList = this.userVehicles;
  }

  ngOnInit(): void {
    this.vehicleInfoService.requestVehicleInfos().then(data => {
      this.userVehicles = data.linkedVehicles;
      this.filteredVehicleList = this.userVehicles;
    });
  }

  onFilterChange(event: Event): void {
    const filterString = (event.target as HTMLInputElement).value;
    this.filteredVehicleList = filterString.length > 0 ?
      this.userVehicles.filter(elem => elem.name.toLowerCase().includes(filterString.toLowerCase())) :
      this.userVehicles;
  }

}
