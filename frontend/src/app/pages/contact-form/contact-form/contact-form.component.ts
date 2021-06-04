import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  types = ['parking', 'payment', 'other'];

  isSubmitted: boolean = false;

  requestType: string | undefined;
  requestText: string | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.requestType = params['template'] && this.types.includes(params['template']) ? params['template'] : 'parking';
    });
  }

  ngOnInit(): void {
  }

  submitSupport() {
    this.isSubmitted = true;
  }

}
