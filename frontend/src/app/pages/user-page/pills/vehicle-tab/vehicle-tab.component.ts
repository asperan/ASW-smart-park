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
  errorMessage: string;

  userVehicles: Array<{ vehicleId: string, name: string }>;
  filteredVehicleList: Array<{ vehicleId: string, name: string }>;

  constructor(private vehicleInfoService: VehicleInfoService) {
    this.userVehicles = [];
    this.filteredVehicleList = this.userVehicles;
    this.addVehicleFormVisible = false;
    this.qrcodeScannerVisible = false;
    this.vehicleFormId = "";
    this.linkedVehicleId = "";
    this.errorMessage = "";
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
    this.vehicleInfoService.addVehicleForUser(this.vehicleFormId, data.vehicleName)
      .then(_value => this.updateVehicleList())
      .catch(reason => this.showErrorMessage(reason.error.message))
      .finally(() => {
        this.addVehicleFormVisible = false;
        this.qrcodeScannerVisible = false;
      });
  }

  onRemoveVehicle(vehicleId: string) {
    this.vehicleInfoService.removeVehicleForUser(vehicleId).then(result => {
      this.updateVehicleList();
    }).catch(reason => this.showErrorMessage(reason.error.message));
  }

  toggleVehicleLink(vehicleId: string) {
    if (vehicleId === this.linkedVehicleId) {
      this.unlinkVehicle(vehicleId);
    } else {
      this.linkToVehicle(vehicleId);
    }
  }

  private linkToVehicle(vehicleId: string) {
    this.vehicleInfoService.bindVehicleToUser(vehicleId).then(_result => this.updateVehicleList()).catch(reason => this.showErrorMessage(reason.error.message));
  }

  private unlinkVehicle(vehicleId: string) {
    this.vehicleInfoService.unbindVehicleFromUser(vehicleId).then(_result => this.updateVehicleList()).catch(reason => this.showErrorMessage(reason.error.message));
  }

  private updateVehicleList() {
    this.vehicleInfoService.requestVehicleInfos().then(data => {
      this.userVehicles = data.linkedVehicles;
      this.filteredVehicleList = this.userVehicles;
    });
    this.vehicleInfoService.getLinkedVehicle().then(response => {
      this.linkedVehicleId = response.vehicleId;
    });
    this.hideErrorMessage();
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
  }

  private hideErrorMessage() {
    this.errorMessage = "";
  }

}