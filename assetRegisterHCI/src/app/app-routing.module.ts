import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AssetRegisterComponent } from './pages/asset-register/asset-register.component';
import { ReportsComponent } from "./pages/reports/reports.component";
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'assetregister', component: AssetRegisterComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'usermanagement', component: UserManagementComponent},
  {path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
