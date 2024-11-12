import { Routes } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { LoginGuard } from './core/guards/login.guard';
import { DetailsComponent } from './public/products/details/details.component';
import { MainComponent } from './public/main/main.component';
import { AddComponent } from './public/products/add/add.component';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Login',
    component: AuthComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard],
      },
      { path: '**', redirectTo: 'auth/login' },
    ],
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Zatya',
        component: DashboardComponent,
      },
      {
        path: 'product/view',
        component: DetailsComponent,
      },
      {
        path: 'product/add',
        component: AddComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'main/dashboard',
  },
];
