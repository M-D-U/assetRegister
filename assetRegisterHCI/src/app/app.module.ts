import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AssetRegisterComponent } from './pages/asset-register/asset-register.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ProfileComponent } from './pages/profile/profile.component';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AssetRegisterComponent,
    ReportsComponent,
    UserManagementComponent,
    ProfileComponent,
    // RouterModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    //CommonModule, // Include CommonModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
