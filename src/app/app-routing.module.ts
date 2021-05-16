import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'app-home-page', component: HomePageComponent },
  { path: 'app-navbar', component: NavbarComponent},
  { path: 'app-search', component: SearchComponent},
  { path: 'app-login-page', component: LoginPageComponent},
  { path: 'app-registration-page', component: RegistrationPageComponent},
  { path: '', redirectTo: 'app-login-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
