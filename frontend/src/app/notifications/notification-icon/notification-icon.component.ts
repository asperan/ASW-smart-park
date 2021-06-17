import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { NotificationService } from "../notification.service";

@Component({
  selector: "notification-icon",
  templateUrl: "./notification-icon.component.html",
  styleUrls: ["./notification-icon.component.css"],
})
export class NotificationIconComponent {
  notificationCount!: number;
  updateInterval!: any;

  constructor(private notificationService: NotificationService, private tokenManagerService: TokenManagerService, private router: Router) {
    this.notificationCount = 0;
    this.updateNotificationCount = this.updateNotificationCount.bind(this);
    this.updateNotificationCount();
    this.notificationService.registerNotificationIcon(this);
  }

  ngOnInit() {
    const seconds = 10;
    this.updateInterval = setInterval(this.updateNotificationCount, seconds * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  updateNotificationCount() {
    this.tokenManagerService.isAuthenticated().subscribe(ok => {
      if (ok) { this.notificationService.getUnreadNotificationCount().then((data: any) => this.notificationCount = data.count); }
    });
  }

  onIconClicked() {
    this.router.navigate(["notifications"]);
  }
}