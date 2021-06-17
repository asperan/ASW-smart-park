import { Component } from "@angular/core";
import { NotificationService } from "../notification.service";

@Component({
  selector: "notification-page",
  templateUrl: "./notification-page.component.html",
  styleUrls: ["./notification-page.component.css"]
})
export class NotificationPageComponent {
  userNotifications: any[];

  constructor(private notificationService: NotificationService) {
    this.userNotifications = [];
  }

  ngOnInit() {
    this.notificationService.getAllUserNotifications().then((data: any) => {
      this.userNotifications = data.notifications;
      this.notificationService.updateUserLastNotificationCheck();
    });
  }
}