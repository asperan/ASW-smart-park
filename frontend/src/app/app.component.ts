import { Component } from '@angular/core';
import { SimpleService } from './simple-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-parking';

  constructor(private simpleService: SimpleService) {}


  ngOnInit() {

  }
}
