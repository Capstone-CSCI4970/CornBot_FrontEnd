import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**logs out user by clearing username, uid, and authtoken 
   * then redirects to login screen
   */
  logout() {
    localStorage.clear();
    console.log("logged out");
    this.router.navigate(['/login']);    
  }

}
