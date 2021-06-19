import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class BasicInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestBasicInfos(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user/info-basic", {headers: {"x-access-token": this.tokenManagerService.getToken()}}).toPromise();
  }
}
