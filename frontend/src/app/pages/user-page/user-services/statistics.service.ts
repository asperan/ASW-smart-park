import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";

@Injectable({
  providedIn: "root",
})
export class UserStatisticsService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestUserStatistics(): Promise<any> {
    return this.http.post("http://localhost:3000/api/user-info/stats", {}, {headers: {"x-access-token": await this.tokenManagerService.getToken()}}).toPromise();
  }
}