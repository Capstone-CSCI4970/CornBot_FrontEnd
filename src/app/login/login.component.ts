import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register: any;
  authToken = '';
  uid = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.register = {
      username: '',
      password: ''
    }
  }
  
  /**
   * calls http service to register user in database
   */
  registerUser(): void {
    this.userService.registerUser(this.register).subscribe(
      resp => {
        alert('User ' + this.register.username + ' has been created');
      },
      error => 
        console.log(error)
    );
    console.log("Attempting to register user: ", this.register.username);
  }

  /**
   * calls http service to log in user, if an authtoken is received, 
   * the user has been authenticated and the token is saved in localStorage
   * username and uid are also saved in localStorage
   */
  loginUser(): void {
    this.userService.loginUser(this.register).subscribe (
      response => {
        this.authToken = response['token']
        console.log("This is the authtoken: ", this.authToken)
      },
      error =>
        console.log(error)
    )
    localStorage.setItem('auth', this.authToken);
    this.userService.getUID(this.register.username).subscribe(response =>
      { this.uid = response['uid']; });
    localStorage.setItem('username', this.register.username);
    localStorage.setItem('userID', this.uid);
    this.router.navigate(['/home']);
  }

}

