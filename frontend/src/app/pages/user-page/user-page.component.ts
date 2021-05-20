import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private basicInfoService: BasicInfoService, private router: Router) {
    this.selectedTab = SubComponent.MyVehicles;
    this.userEmail = "";
  }

  ngOnInit(): void {
    this.basicInfoService.requestBasicInfos().then(data => this.userEmail = data.email, reason => this.onFailedRequest(reason));
  }

  selectTab(tab: SubComponent): void {
    this.selectedTab = tab;
  }

  onFailedRequest(reason: any): void {
    alert("An authentication error occurred while retrieving your informations:" + reason.error.message + "\nYou will be redirected to the sign in page.");
    this.router.navigate(['signin']);
  }
}

enum SubComponent {
  MyVehicles,
  PaymentHistory,
  Statistics
};