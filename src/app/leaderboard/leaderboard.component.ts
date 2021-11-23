import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccModel } from '../models/user-acc-model';
import { AnalyticsService } from '../services/analytics.service';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  data: UserAccModel[] = [];
  displayedColumns = ['username', 'accuracy'];
  dataSource !: MatTableDataSource<UserAccModel>;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticsService.getLeaderboardData().subscribe(response => {
        Object.entries(response).forEach(entry => {
          if(typeof entry[1] == 'number') {
            this.data.push({'username': entry[0], 'accuracy': entry[1]})
          }
          else  {
            this.data.push({'username': entry[0], 'accuracy': 0})
          }
        });
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.data);
    });
    // this.sort.sort(({ id: 'accuracy', start: 'desc'}) as MatSortable);
    // this.dataSource.sort = this.sort;
  }

}
