import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    InputIconModule,
    PasswordModule,
    InputSwitchModule,
    ToastModule,
    ReactiveFormsModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  hardcodedUser = {
    email: 'londerotizi@gmail.com',
    password: 'Encode2022!'
  };

  constructor(
    private userService: UserService, 
    private fb: FormBuilder,
    private toast: ToastService,
    private router: Router) {
  }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userEmail, userPassword } = this.loginForm.value;

      if (userEmail === this.hardcodedUser.email && userPassword === this.hardcodedUser.password) {
        this.userService.setAuthenticated(true);
        this.router.navigate(['']);
      } else {
        console.log("error");
        
        this.toast.showError("Usuario o contraseña incorrectos");
      }
    }
}

}