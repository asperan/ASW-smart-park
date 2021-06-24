import { Component, OnInit } from '@angular/core';
import { UserStatisticsService } from '../../user-services/statistics.service';

type UserStatistic = {
  name: string,
  value: string
};

@Component({
  selector: 'app-statistics-tab',
  templateUrl: './statistics-tab.component.html',
  styleUrls: ['./statistics-tab.component.css']
})
export class StatisticsTabComponent implements OnInit {

  userStatistics!: UserStatistic[];

  constructor(private userStatisticsService: UserStatisticsService) {
    this.userStatistics = [];
  }

  ngOnInit(): void {
    this.userStatisticsService.requestUserStatistics().then(data => this.userStatistics = data);
  }

}
