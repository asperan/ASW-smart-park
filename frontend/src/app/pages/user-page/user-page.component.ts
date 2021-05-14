import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  selectedTab: SubComponent;
  SubComponent = SubComponent;

  constructor() {
    this.selectedTab = SubComponent.MyVehicles;
  }

  ngOnInit(): void {
  }

  selectTab(tab: SubComponent): void {
    this.selectedTab = tab;
  }

}

enum SubComponent {
  MyVehicles,
  PaymentHistory,
  Statistics
};