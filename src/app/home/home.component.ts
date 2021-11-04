import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // username = "";
  // uid = "";

  constructor() { }

  ngOnInit(): void {
    // if(localStorage.getItem('username')) {
    //   this.username = localStorage.getItem('username');
    // }
    // const username = localStorage.getItem('username');
 
    // this.uid = localStorage.getItem('userID');
  }

}
