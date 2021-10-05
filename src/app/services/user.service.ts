import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/users/', userData)
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/', userData)
  }

  // // example of authentication getting tutorials endpoint
  // getTutorials(authToken: string): Observable<any> {
  //   const authentication = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Authorization': 'token ' + authToken // need to add the authentication token to be allowed to get tutorials
  //   })
  //   return this.http.get('http://localhost:8000/api/tutorials', { headers: authentication})
  // }
}
