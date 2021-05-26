import { Component } from "@angular/core";
import { NotificationService } from "./notification.service";

@Component({
  selector: "notification-icon",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationIconComponent {
  notificationCount!: number;
  updateInterval!: any;

  constructor(private notificationService: NotificationService) {
    this.notificationCount = 0;
    this.updateNotificationCount = this.updateNotificationCount.bind(this);
  }

  ngOnInit() {
    const seconds = 10;
    this.updateInterval = setInterval(this.updateNotificationCount, seconds * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  private updateNotificationCount() {
    this.notificationService.getUnreadNotificationCount().then((data: any) => this.notificationCount = data.count);
  }
}