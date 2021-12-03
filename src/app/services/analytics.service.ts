import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  /**
   * gets usernames and accuracies from backend
   */
  getLeaderboardData(token: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Token ' + token
      })
    };
    return this.http.get<any>('http://localhost:8000/api/get_users_leaderboard/', httpOptions);
  }
}
