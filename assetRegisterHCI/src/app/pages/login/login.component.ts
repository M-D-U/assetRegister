import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
// loginForm: FormGroup;
  
  constructor( private router:Router) {
    /* this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] 
    });*/
  }

  login(){
    console.log('we are going to the home page');
    this.router.navigate(['home']);
  }
}
