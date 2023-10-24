import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
 /*  user = {
    avatar: 'assets/avatar.jpg',
    name: 'John Doe',
    email: 'john@example.com',
    fullName: 'John Smith Doe',
    phone: '123-456-7890',
    address: '123 Main St, City, Country'
  }; */

  //profileForm: FormGroup; // Declare a reactive form group

  constructor(private formBuilder: FormBuilder) {
    /* this.profileForm = this.formBuilder.group({
      fullName: [this.user.fullName],
      phone: [this.user.phone],
      address: [this.user.address],
    }); */
  }

  changePassword() {
    // Implement password change logic here
    console.log('Password changed');
  }
}
