import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-asset-register',
  templateUrl: './asset-register.component.html',
  styleUrls: ['./asset-register.component.scss']
})
export class AssetRegisterComponent {

  isModalOpen: boolean = false;
  newDeviceName: string = '';
  
  userDeviceData = [
    {
      imageLink: './../../../assets/nordwood-themes-_sg8nXmpWDM-unsplash.jpg',
      user: 'John Doe',
      serial: 'SN12345',
      deviceId: 'DEVICE001',
      deviceMake: 'HP Laptop',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Laptop',
      department: 'IT Department',
      purchaseDate: '2023-10-03',
      lastMaintenanceDate: '2023-10-01',
      serviceHistory: [
        {
          date: '2023-10-01',
          agent: 'Service Technician 1',
          comments: 'Performed routine maintenance.'
        }
      ]
    },
    {
      imageLink: './../../../assets/nordwood-themes-_sg8nXmpWDM-unsplash.jpg',
      user: 'Jane Smith',
      serial: 'SN56789',
      deviceId: 'DEVICE002',
      deviceMake: 'Dell Desktop',
      condition: 'Fair',
      status: 'In Use',
      deviceType: 'Desktop',
      department: 'HR Department',
      purchaseDate: '2023-10-03',
      lastMaintenanceDate: '2023-09-15',
      serviceHistory: [
        {
          date: '2023-09-15',
          agent: 'Service Technician 2',
          comments: 'Replaced faulty hard drive.'
        }
      ]
    },
    {
      imageLink: './../../../assets/nordwood-themes-_sg8nXmpWDM-unsplash.jpg',
      user: 'Bob Johnson',
      serial: 'SN98765',
      deviceId: 'DEVICE003',
      deviceMake: 'Lenovo Tablet',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Tablet',
      department: 'Finance Department',
      purchaseDate: '2023-10-03',
      lastMaintenanceDate: '2023-09-20',
      serviceHistory: [
        {
          date: '2023-09-20',
          agent: 'Service Technician 3',
          comments: 'Updated software and security patches.'
        }
      ]
    },
    {
      imageLink: './../../../assets/nordwood-themes-_sg8nXmpWDM-unsplash.jpg',
      user: 'Alice Brown',
      serial: 'SN24680',
      deviceId: 'DEVICE004',
      deviceMake: 'Apple MacBook',
      condition: 'Excellent',
      status: 'In Use',
      deviceType: 'Laptop',
      department: 'Marketing Department',
      purchaseDate: '2023-10-03',
      lastMaintenanceDate: '2023-09-10',
      serviceHistory: [
        {
          date: '2023-09-10',
          agent: 'Service Technician 4',
          comments: 'Cleaned and optimized performance.'
        }
      ]
    },
    {
      imageLink: './../../../assets/nordwood-themes-_sg8nXmpWDM-unsplash.jpg',
      user: 'Mike Wilson',
      serial: 'SN13579',
      deviceId: 'DEVICE005',
      deviceMake: 'Dell Monitor',
      condition: 'Good',
      status: 'In Use',
      deviceType: 'Monitor',
      department: 'IT Department',
      purchaseDate: '2023-10-03',
      lastMaintenanceDate: '2023-10-05',
      serviceHistory: [
        {
          date: '2023-10-05',
          agent: 'Service Technician 5',
          comments: 'Calibrated display settings.'
        }
      ]
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

    maintain(){
      console.log('test');
      
    }

    openOffcanvas() {
      const offcanvasElement = document.getElementById('maintainDeviceOffcanvas');
      const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    }
  
    closeOffcanvas() {
      const offcanvasElement = document.getElementById('maintainDeviceOffcanvas');
      const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.hide();
    }
}
