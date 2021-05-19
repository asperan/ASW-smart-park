import { Component, OnInit } from '@angular/core';
import { VehicleInfoService } from '../user-services/vehicle-info.service';

@Component({
  selector: 'app-vehicle-tab',
  templateUrl: './vehicle-tab.component.html',
  styleUrls: ['./vehicle-tab.component.css']
})
export class VehicleTabComponent implements OnInit {

  userVehicles: Array<{vehicleId: string, name: string}>;

  constructor(private vehicleInfoService: VehicleInfoService) { 
    this.userVehicles = [];
  }

  ngOnInit(): void {
    this.vehicleInfoService.requestVehicleInfos().then(data => {
      this.userVehicles = data.linkedVehicles;
    });
  }

}
