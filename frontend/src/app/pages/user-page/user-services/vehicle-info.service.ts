import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";

@Injectable({
  providedIn: "root",
})
export class VehicleInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestVehicleInfos(): Promise<any> {
    return this.http.post("http://localhost:3000/api/user-info/vehicles", {}, {headers: {"x-access-token": await this.tokenManagerService.getToken()}}).toPromise();
  }
}