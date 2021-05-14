import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from './user-services/basic-info.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  selectedTab: SubComponent;
  SubComponent = SubComponent;

  userEmail: string;

  constructor(private basicInfoService: BasicInfoService) {
    this.selectedTab = SubComponent.MyVehicles;
    this.userEmail = "";
  }

  ngOnInit(): void {
    this.basicInfoService.requestBasicInfos().then(data => this.userEmail = data.email);
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