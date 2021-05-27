import { Component } from "@angular/core";
import { NotificationService } from "../notification.service";

@Component({
  selector: "notification-icon",
  templateUrl: "./notification-icon.component.html",
  styleUrls: ["./notification-icon.component.css"],
})
export class NotificationIconComponent {
  notificationCount!: number;
  updateInterval!: any;

  constructor(private notificationService: NotificationService) {
    this.notificationCount = 0;
    this.updateNotificationCount = this.updateNotificationCount.bind(this);
    this.updateNotificationCount();
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