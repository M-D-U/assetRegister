import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  assetSummary = {
    totalAssets: 500,
    assetDistributionByCategory: [
      { category: 'Hardware', count: 250 },
      { category: 'Software', count: 100 },
      { category: 'Network Equipment', count: 150 }
    ],
    assetDistributionByLocation: [
      { location: 'Plant', count: 20 },
      { location: 'West Gate', count: 15 },
      { location: 'Office Block', count: 50 },
      { location: 'Security office', count: 15 },
      { location: 'New Control Room', count: 15 },
      { location: 'Old Control Room', count: 15 },
      { location: 'Weight Bridge', count: 15 },
    ]
  };

  assetStatus = {
    assetsInUse: 400,
    assetsUnderMaintenance: 50,
    decommissionedAssets: 50
  };
  
  constructor( private router:Router) {
  }

  // assets page
  assets(){
    console.log('we are in the assets page');
    this.router.navigate(['assetregister']);
  }

  //reports page
  reports(){
    this.router.navigate(['reports']);
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
