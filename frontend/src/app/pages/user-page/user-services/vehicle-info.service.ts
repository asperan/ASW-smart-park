import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class VehicleInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) { }

  async requestVehicleInfos(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user/info-vehicles", { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async addVehicleForUser(vehicleId: string, vehicleName: string): Promise<any> {
    return this.http.post(environment.baseUrl + "/user/info-vehicles", { vehicleId: vehicleId, vehicleName: vehicleName }, { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async removeVehicleForUser(vehicleId: string): Promise<any> {
    return this.http.delete(environment.baseUrl + "/user/info-vehicles", { headers: { "x-access-token": this.tokenManagerService.getToken() }, params: { vehicleId: vehicleId } }).toPromise();
  }

  async getLinkedVehicle(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user/linked-vehicle", { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async bindVehicleToUser(vehicleId: string): Promise<any> {
    return this.http.post(environment.baseUrl + "/user/linked-vehicle", { vehicleId: vehicleId }, { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async unbindVehicleFromUser(vehicleId: string): Promise<any> {
    return this.http.delete(environment.baseUrl + "/user/linked-vehicle", { headers: { "x-access-token": this.tokenManagerService.getToken() }, params: { vehicleId: vehicleId } }).toPromise();
  }
}
