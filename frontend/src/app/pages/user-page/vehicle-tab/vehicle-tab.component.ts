import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-tab',
  templateUrl: './vehicle-tab.component.html',
  styleUrls: ['./vehicle-tab.component.css']
})
export class VehicleTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Vehicle tab init");
  }

}
