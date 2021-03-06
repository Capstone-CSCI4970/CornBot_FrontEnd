import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register: any;
  authToken = '';
  uid = '';
  response!: Promise<any>;

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
    this.userService.loginUser(this.register).pipe(map(data => {this.authToken = data['token'];
                                                        console.log("This is the authtoken: "+ this.authToken)
        })).subscribe (response => {
        this.userService.getUID(this.register.username, this.authToken).subscribe(response =>
          { this.uid = response['uid']; 
          localStorage.setItem('userID', this.uid);
          localStorage.setItem('auth', this.authToken);
          this.router.navigate(['/home']);    
        });
      },
      error =>
        console.log(error)
    )

    // console.log("auth token after subscription "+ this.authToken)
    localStorage.setItem('username', this.register.username);
    
  }

  // getAuthToken() {
  //   return new Promise
  //   this.userService.loginUser(this.register).subscribe( response => {
  //     this.authToken = response['token']
  //       console.log("This is the authtoken: "+ this.authToken)
  //       localStorage.setItem('auth', this.authToken);
  //   });
  // }

}

