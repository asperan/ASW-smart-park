import { Component, Input, OnInit } from '@angular/core';
import { Pricing } from '../../parking-detail.component';

@Component({
  selector: 'app-pricing-detail',
  templateUrl: './pricing-detail.component.html',
  styleUrls: ['./pricing-detail.component.css']
})
export class PricingDetailComponent implements OnInit {

  @Input() pricings: Pricing[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
