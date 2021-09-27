import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {

  register: any;
  title = 'CornBots';
  authToken = '';

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.register = {
      username: '',
      password: '',
      email: '',
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
  }

  // example authentication using tutorials endpoint
  getTutorials(): void {
    console.log("Getting tutorials.....\n")
    this.userService.getTutorials(this.authToken).subscribe (
      response => {
        console.log(response)
      },
      error =>
        console.log(error)
    )
  }

}
