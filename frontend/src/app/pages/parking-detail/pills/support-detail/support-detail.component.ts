import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-support-detail',
  templateUrl: './support-detail.component.html',
  styleUrls: ['./support-detail.component.css']
})
export class SupportDetailComponent implements OnInit {

  private cityName: string | undefined;
  private parkingId: number | undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityName = params['cityName'];
      this.parkingId = params['id'];
    });
  }

  navigateToContact(template: string) {
    this.router.navigateByUrl("/contact-us?template=" + template);
  }

}
