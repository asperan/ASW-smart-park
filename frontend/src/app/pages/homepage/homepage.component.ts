import { Component, OnInit } from '@angular/core';
import { BluetoothService } from './../../services/bluetooth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public bluetoothService: BluetoothService) { }

  ngOnInit(): void {
  }

}
