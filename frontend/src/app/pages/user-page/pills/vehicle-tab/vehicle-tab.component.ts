import { Component, OnInit } from '@angular/core';
import { faCamera, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { VehicleInfoService } from '../../user-services/vehicle-info.service';

@Component({
  selector: 'app-vehicle-tab',
  templateUrl: './vehicle-tab.component.html',
  styleUrls: ['./vehicle-tab.component.css']
})
export class VehicleTabComponent implements OnInit {
  
  faTrash = faTrash;
  faPlus = faPlus;
  faCamera = faCamera;
  addVehicleFormVisible: boolean;
  qrcodeScannerVisible: boolean;
  vehicleFormId: string;

  userVehicles: Array<{vehicleId: string, name: string}>;
  filteredVehicleList: Array<{vehicleId: string, name: string}>;

  constructor(private vehicleInfoService: VehicleInfoService) { 
    this.userVehicles = [];
    this.filteredVehicleList = this.userVehicles;
    this.addVehicleFormVisible = false;
    this.qrcodeScannerVisible = false;
    this.vehicleFormId = "";
  }

  ngOnInit(): void {
    this.updateVehicleList();
  }

  onFilterChange(event: Event): void {
    const filterString = (event.target as HTMLInputElement).value;
    this.filteredVehicleList = filterString.length > 0 ?
      this.userVehicles.filter(elem => elem.name.toLowerCase().includes(filterString.toLowerCase())) :
      this.userVehicles;
  }

  openAddVehicleForm() {
    // TODO add logic, maybe navigate to a separate page?
    this.addVehicleFormVisible = !this.addVehicleFormVisible;
    this.qrcodeScannerVisible = this.addVehicleFormVisible;
  }

  toggleQrScanner() {
    this.qrcodeScannerVisible = !this.qrcodeScannerVisible;
  }

  capturedQr(vehicleId: string) {
    console.log(vehicleId);
    this.vehicleFormId = vehicleId;
    this.qrcodeScannerVisible = false;
  }

  onAddVehicle(data: any) {
    console.log(data);
    this.vehicleInfoService.linkUserToVehicle(this.vehicleFormId, data.vehicleName).then(_value => {
      this.updateVehicleList();
    }).finally(() => {
      this.addVehicleFormVisible = false;
      this.qrcodeScannerVisible = false;
    });
  }

  private updateVehicleList() {
    this.vehicleInfoService.requestVehicleInfos().then(data => {
      this.userVehicles = data.linkedVehicles;
      this.filteredVehicleList = this.userVehicles;
    });
  }

}
