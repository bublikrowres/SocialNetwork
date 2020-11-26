import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MainComponent } from './wall/main/main.component';
import { IsAuthGuard } from './shared/guards/is-auth.guard';
import { NotAuthGuard } from './shared/guards/not-auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from "./profile/profile/profile.component";


const routes: Routes = [
  {component: LoginComponent, path: 'login', canActivate: [NotAuthGuard]},
  {component: RegisterComponent, path: 'register', canActivate: [NotAuthGuard]},
  {component: NavbarComponent, path: 'nav', canActivate: [IsAuthGuard],
children: [
  {path: '', redirectTo: 'wall',pathMatch: 'full'},
  {path: 'wall', component: MainComponent,},
  {path: 'profile', component: ProfileComponent,},
]},
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
