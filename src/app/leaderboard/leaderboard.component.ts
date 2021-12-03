import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserAccModel } from '../models/user-acc-model';
import { AnalyticsService } from '../services/analytics.service';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  data: UserAccModel[] = [];
  displayedColumns = ['username', 'accuracy'];
  dataSource !: MatTableDataSource<UserAccModel>;
  @ViewChild(MatSort, {static: false}) sort !: MatSort;
//   @ViewChild(MatSort) set matSort(sort: MatSort) {
//     this.dataSource.sort = sort;
// }

  constructor(private analyticsService: AnalyticsService) { }
  ngAfterViewInit(): void {
      // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const authToken = localStorage.getItem('auth');
    if(authToken) {
      this.analyticsService.getLeaderboardData(authToken).subscribe(response => {
          console.log(response);
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
          this.dataSource.sort = this.sort;
          this.sort.sort(({ id: 'accuracy', start: 'desc'}) as MatSortable);
      });

    }
  }

}
