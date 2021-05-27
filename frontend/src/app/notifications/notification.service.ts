import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "../access-token/token-manager";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) { }

  async getUnreadNotificationCount() {
    return this.http.get("http://localhost:3000/api/notifications/unread", { headers: { "x-access-token": await this.tokenManagerService.getToken() } }).toPromise();
  }

  async getUserNotificationSummary() {
    return this.http.get("http://localhost:3000/api/notifications", { headers: { "x-access-token": await this.tokenManagerService.getToken() } }).toPromise();
  }

  async getAllUserNotifications() {
    return this.http.get("http://localhost:3000/api/notifications/all", { headers: { "x-access-token": await this.tokenManagerService.getToken() } }).toPromise();
  }
}