import { Component, OnInit } from '@angular/core';
import { faCamera, faPlus, faTrash, faLink } from '@fortawesome/free-solid-svg-icons';
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
  faLink = faLink;
  addVehicleFormVisible: boolean;
  qrcodeScannerVisible: boolean;
  vehicleFormId: string;
  linkedVehicleId: string;

  userVehicles: Array<{vehicleId: string, name: string}>;
  filteredVehicleList: Array<{vehicleId: string, name: string}>;

  constructor(private vehicleInfoService: VehicleInfoService) { 
    this.userVehicles = [];
    this.filteredVehicleList = this.userVehicles;
    this.addVehicleFormVisible = false;
    this.qrcodeScannerVisible = false;
    this.vehicleFormId = "";
    this.linkedVehicleId = "";
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
    this.addVehicleFormVisible = !this.addVehicleFormVisible;
    this.qrcodeScannerVisible = this.addVehicleFormVisible;
  }

  toggleQrScanner() {
    this.qrcodeScannerVisible = !this.qrcodeScannerVisible;
  }

  capturedQr(vehicleId: string) {
    this.vehicleFormId = vehicleId;
    this.qrcodeScannerVisible = false;
  }

  onAddVehicle(data: any) {
    this.vehicleInfoService.linkUserToVehicle(this.vehicleFormId, data.vehicleName).then(_value => {
      this.updateVehicleList();
    }).finally(() => {
      this.addVehicleFormVisible = false;
      this.qrcodeScannerVisible = false;
    });
  }

  linkToVehicle(vehicleId: string) {
    this.vehicleInfoService.bindVehicleToUser(vehicleId).then(_result => this.updateVehicleList());
  }

  // TODO:
  // unlinkVehicle(vehicleId: string) {}

  private updateVehicleList() {
    this.vehicleInfoService.requestVehicleInfos().then(data => {
      this.userVehicles = data.linkedVehicles;
      this.filteredVehicleList = this.userVehicles;
    });
    this.vehicleInfoService.getLinkedVehicle().then(response => {
      this.linkedVehicleId = response.vehicleId;
    });
  }

}
