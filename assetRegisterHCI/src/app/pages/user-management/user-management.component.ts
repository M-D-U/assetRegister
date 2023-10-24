import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  userRoles = [
    { name: 'Admin', permissions: ['Manage Users', 'Manage Roles'] },
    { name: 'Manager', permissions: ['View Assets', 'Generate Reports'] },
    { name: 'Staff', permissions: ['View Assets'] }
  ];

  users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', accessCount: 32 },
    { name: 'Alice Smith', email: 'alice@example.com', role: 'Manager', accessCount: 20 },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Staff', accessCount: 12 }
  ];

  auditLogs = [
    { userName: 'John Doe', action: 'Login', timestamp: new Date('2023-10-01T09:15:00') },
    { userName: 'Alice Smith', action: 'Update Profile', timestamp: new Date('2023-10-01T10:30:00') },
    { userName: 'Bob Johnson', action: 'Login', timestamp: new Date('2023-10-01T11:45:00') }
  ];

  passwordPolicy = {
    minLength: 8,
    complexity: 'Alphanumeric with symbols',
    expiration: '90 days'
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