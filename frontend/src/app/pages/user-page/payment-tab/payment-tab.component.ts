import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-tab',
  templateUrl: './payment-tab.component.html',
  styleUrls: ['./payment-tab.component.css']
})
export class PaymentTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Payment tab init");
    // TODO:
    // Get payments user infos
  }

}
