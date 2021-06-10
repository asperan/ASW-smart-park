import { Component, OnInit } from '@angular/core';
import { PaymentInfoService } from "../../user-services/payment-info.service";

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

  userPayments!: Array<PaymentObject>;

  constructor(private paymentService: PaymentInfoService ) {
    this.userPayments = [];
  }

  ngOnInit(): void {
    this.paymentService.requestPaymentInfos().then(data => this.userPayments = data);
  }

}
