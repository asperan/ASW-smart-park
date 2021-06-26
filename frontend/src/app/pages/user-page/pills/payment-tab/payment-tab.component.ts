import { Component, OnInit } from '@angular/core';
import { PaymentInfoService } from "../../user-services/payment-info.service";

type PermanenceObject = {
  parkingAddress: string,
  entryDate: Date,
  exitDate: Date,
  payedUntil: Date,
  amountPayed: number
};

@Component({
  selector: 'app-payment-tab',
  templateUrl: './payment-tab.component.html',
  styleUrls: ['./payment-tab.component.css']
})
export class PaymentTabComponent implements OnInit {

  userPermanences!: Array<PermanenceObject>;

  constructor(private paymentService: PaymentInfoService) {
    this.userPermanences = [];
  }

  ngOnInit(): void {
    this.paymentService.requestPermanenceInfos().then(data => this.userPermanences = data);
  }

}