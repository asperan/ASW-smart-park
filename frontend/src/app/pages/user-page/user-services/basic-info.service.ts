import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";

@Injectable({
  providedIn: "root",
})
export class BasicInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestBasicInfos(): Promise<any> {
    return this.http.get("http://localhost:3000/api/user/info-basic", {headers: {"x-access-token": await this.tokenManagerService.getToken()}}).toPromise();
  }
}