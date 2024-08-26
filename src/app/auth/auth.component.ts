import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    ToastModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  currentRoute: string = '';

  constructor(
    private userService: UserService, 
    private router: Router) {
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    
  }

  onDashboard(){
    this.userService.logout();
    this.router.navigate(['']);
  }
}
