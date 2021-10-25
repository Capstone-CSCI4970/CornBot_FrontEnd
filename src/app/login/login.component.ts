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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.register = {
      username: '',
      password: ''
    }
  }
  
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

  loginUser(): void {
    this.userService.loginUser(this.register).subscribe (
      response => {
        this.authToken = response['token']
        console.log("This is the authtoken: ", this.authToken)
      },
      error =>
        console.log(error)
    )
    sessionStorage.setItem('auth', this.authToken);
    this.router.navigate(['/home']);
  }

}

