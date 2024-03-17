import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AssetRegisterComponent } from './pages/asset-register/asset-register.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HelpusComponent } from './pages/helpus/helpus.component';
import { HttpClientModule } from '@angular/common/http'; 

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'helpus', component: HelpusComponent },
  { path: 'assetregister', component: AssetRegisterComponent },
  { path: 'usermanagement', component: UserManagementComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AssetRegisterComponent,
    UserManagementComponent,
    ProfileComponent,
    NavbarComponent,
    HelpusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Include HttpClientModule in the imports array
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
