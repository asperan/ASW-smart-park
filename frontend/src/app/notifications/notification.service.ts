import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "../access-token/token-manager";
import { SwPush } from "@angular/service-worker";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService, private swPush: SwPush) { }

  async getUnreadNotificationCount() {
    return this.http.get("http://localhost:3000/api/notifications/unread", { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async getUserNotificationSummary() {
    return this.http.get("http://localhost:3000/api/notifications", { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async getAllUserNotifications() {
    return this.http.get("http://localhost:3000/api/notifications/all", { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async subcribeToPushNotification() {
    const subscription = await this.swPush.requestSubscription({ serverPublicKey: environment.vapidKey });
    return this.http.post("http://localhost:3000/api/user/subscription", { subscription: subscription }, { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }
}