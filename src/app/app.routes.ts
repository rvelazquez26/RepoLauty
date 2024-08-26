import { Routes } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthComponent } from './auth/auth.component';


export const routes: Routes = [
    { path:'', component: DashboardComponent},
    { path: 'register', component: AuthComponent },
    { path: 'login', component: AuthComponent }
];
