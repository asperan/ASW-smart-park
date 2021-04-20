import { Component, Input } from '@angular/core';
import { SimpleService } from './simple-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-parking';
  @Input() message = "";

  constructor(private simpleService: SimpleService) {}


  ngOnInit() {
    // WARNING: this is a suboptimal way to change the view on data changes
    this.simpleService.getApiMessage().subscribe(data => this.message = (data as any).message);
  }
}
