import { Component, OnInit } from '@angular/core';
import { PaymentInfoService } from "../../user-services/payment-info.service";

// TODO: update permanence object
type PaymentObject = {
  userEmail: string,
  parkingId: string,
  date: Date,
  amount: number,
  pending: boolean,
};

@Component({
  selector: 'app-payment-tab',
  templateUrl: './payment-tab.component.html',
  styleUrls: ['./payment-tab.component.css']
})
export class PaymentTabComponent implements OnInit {

  userPermanences!: Array<any>;

  constructor(private paymentService: PaymentInfoService ) {
    this.userPermanences = [];
  }

  ngOnInit(): void {
    this.paymentService.requestPermanenceInfos().then(data => this.userPermanences = data);
  }

}
