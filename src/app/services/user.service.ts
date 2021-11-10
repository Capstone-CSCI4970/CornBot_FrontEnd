import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * posts username and password to backend to be saved in db
   * @param userData 
   * @returns HTTP Response
   */
  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/users/', userData)
  }

  /**
   * posts username and password to backend for authentication
   * @param userData 
   * @returns authtoken
   */
  loginUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/', userData)
  }

  /**
   * convenience method to get userid with username, uid is 
   * needed to create new choice records
   * @param username 
   * @returns userid
   */
  getUID(username: string): Observable<any> {
    // const auth = new HttpHeaders({
    //   'Content-type': 'application/json',
    //   'Authorization': 'Token ' + localStorage.getItem("auth")
    // });
    return this.http.get('http://localhost:8000/api/getuid/' + username + '/')
  }

}
