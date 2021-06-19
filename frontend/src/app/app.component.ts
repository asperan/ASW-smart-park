import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  constructor(private router: Router, private authListener: AuthenticationListenerService) {
    this.currentRoute = router.url;
    router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }
      });
  }
  
  ngOnInit() {
    this.authListener.sharedIsAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
