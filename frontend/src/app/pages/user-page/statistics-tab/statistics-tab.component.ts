import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-tab',
  templateUrl: './statistics-tab.component.html',
  styleUrls: ['./statistics-tab.component.css']
})
export class StatisticsTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Statistics tab init");
  }

}
