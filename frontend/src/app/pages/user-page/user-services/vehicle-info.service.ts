import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class VehicleInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestVehicleInfos(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user/info-vehicles", {headers: {"x-access-token": this.tokenManagerService.getToken()}}).toPromise();
  }

  async linkUserToVehicle(vehicleId: string, vehicleName: string): Promise<any> {
    return this.http.post(environment.baseUrl + "/user/info-vehicles", {vehicleId: vehicleId, vehicleName: vehicleName}, {headers: {"x-access-token": this.tokenManagerService.getToken()}}).toPromise();
  }
}
