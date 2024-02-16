import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor( private router:Router) {
  }
  // assets page
  assets(){
    console.log('we are in the assets page');
    this.router.navigate(['assetregister']);
  }

    //user management
  userManagement(){
      this.router.navigate(['usermanagement']);
  }

  //profile
  profile(){
    this.router.navigate(['profile']);
  }

  //dashboard
  home(){
    this.router.navigate(['home']);
  }
  
  logout(){
    this.router.navigate(['login'])
  }
}
