import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class UserStatisticsService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestUserStatistics(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user/info-stats", {headers: {"x-access-token": this.tokenManagerService.getToken()}}).toPromise();
  }
}
