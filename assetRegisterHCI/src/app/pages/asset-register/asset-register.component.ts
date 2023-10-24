import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-register',
  templateUrl: './asset-register.component.html',
  styleUrls: ['./asset-register.component.scss']
})
export class AssetRegisterComponent {
  userDeviceData = [
    {
      user: 'John Doe',
      serial: 'SN12345',
      deviceId: 'DEVICE001',
      deviceMake: 'HP Laptop',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Laptop',
      department: 'IT Department',
      lastMaintenanceDate: '2023-10-01',
      comment: 'Performed routine maintenance.'
    },
    {
      user: 'Jane Smith',
      serial: 'SN56789',
      deviceId: 'DEVICE002',
      deviceMake: 'Dell Desktop',
      condition: 'Fair',
      status: 'In Use',
      deviceType: 'Desktop',
      department: 'HR Department',
      lastMaintenanceDate: '2023-09-15',
      comment: 'Replaced faulty hard drive.'
    },
    {
      user: 'Bob Johnson',
      serial: 'SN98765',
      deviceId: 'DEVICE003',
      deviceMake: 'Lenovo Tablet',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Tablet',
      department: 'Finance Department',
      lastMaintenanceDate: '2023-09-20',
      comment: 'Updated software and security patches.'
    },
    {
      user: 'Alice Brown',
      serial: 'SN24680',
      deviceId: 'DEVICE004',
      deviceMake: 'Apple MacBook',
      condition: 'Excellent',
      status: 'In Use',
      deviceType: 'Laptop',
      department: 'Marketing Department',
      lastMaintenanceDate: '2023-09-10',
      comment: 'Cleaned and optimized performance.'
    },
    {
      user: 'Mike Wilson',
      serial: 'SN13579',
      deviceId: 'DEVICE005',
      deviceMake: 'Dell Monitor',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Monitor',
      department: 'IT Department',
      lastMaintenanceDate: '2023-10-05',
      comment: 'Calibrated display settings.'
    },
    {
      user: 'Emily Davis',
      serial: 'SN86420',
      deviceId: 'DEVICE006',
      deviceMake: 'Samsung Smartphone',
      condition: 'Fair',
      status: 'In Use',
      deviceType: 'Smartphone',
      department: 'Sales Department',
      lastMaintenanceDate: '2023-09-30',
      comment: 'Replaced damaged screen.'
    },
    {
      user: 'David Lee',
      serial: 'SN97531',
      deviceId: 'DEVICE007',
      deviceMake: 'HP Printer',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Printer',
      department: 'IT Department',
      lastMaintenanceDate: '2023-10-02',
      comment: 'Replaced ink cartridges.'
    },
    {
      user: 'Linda Taylor',
      serial: 'SN75319',
      deviceId: 'DEVICE008',
      deviceMake: 'Microsoft Surface Pro',
      condition: 'Excellent',
      status: 'In Use',
      deviceType: 'Tablet',
      department: 'Finance Department',
      lastMaintenanceDate: '2023-09-28',
      comment: 'Updated operating system.'
    },
    {
      user: 'Kevin Clark',
      serial: 'SN64280',
      deviceId: 'DEVICE009',
      deviceMake: 'Dell Laptop',
      condition: 'Fair',
      status: 'In Use',
      deviceType: 'Laptop',
      department: 'HR Department',
      lastMaintenanceDate: '2023-09-25',
      comment: 'Replaced keyboard.'
    },
    {
      user: 'Sarah White',
      serial: 'SN52873',
      deviceId: 'DEVICE010',
      deviceMake: 'Epson Scanner',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Scanner',
      department: 'Admin Department',
      lastMaintenanceDate: '2023-10-03',
      comment: 'Cleaned scanner glass.'
    }
  ];
  
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
