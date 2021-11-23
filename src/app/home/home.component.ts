import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username!: string | null;
  uid = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // if(localStorage.getItem('username')) {
    //   this.username = localStorage.getItem('username');
    // }
 
    this.username = localStorage.getItem('username');
    const authToken = localStorage.getItem('auth');
    if(this.username && authToken) {
      this.userService.getUID(this.username, authToken).subscribe( response => {
        console.log("uid: ", response["uid"]);
        localStorage.setItem('uid', response['uid']);
      });
    // this.uid = localStorage.getItem('userID');
    }
  }

}
