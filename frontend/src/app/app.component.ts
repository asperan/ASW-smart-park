import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `

    <!-- routes will be rendered here -->
    <router-outlet></router-outlet>

  `,
})
export class AppComponent {
  title = 'smart-parking';
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = router.url;
    router.events
      .subscribe((event: any) => {
        if(event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }
      });
  }


  ngOnInit() {

  }
}
