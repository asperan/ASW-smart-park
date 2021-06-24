import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { TokenManagerService } from './access-token/token-manager';
import { AuthenticationListenerService } from './services/authentication-listener-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'smart-parking';
  currentRoute: string;

  isAuthenticated = false;

  constructor(private router: Router, private authListener: AuthenticationListenerService, private auth: TokenManagerService, private swPush: SwPush) {
    this.currentRoute = this.router.url;
    this.router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }
      });
    this.swPush.notificationClicks.subscribe(notification => {
      switch (notification.notification.data.type) {
        case "goto":
          this.router.navigate([notification.notification.data.url]);
          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.authListener.sharedIsAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
