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
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { finalize } from 'rxjs';

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
    CardModule,
    SpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private toast: ToastService,
    private router: Router) {
  }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log(this.isLoading);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .pipe(finalize(()=>{
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      }))
      .subscribe({
        next: (res) => {
          console.log("respuesta");
          console.log(res);
          this.router.navigate(['main/dashboard']);
        },
        error: (error) => {
          setTimeout(() => {
            this.toast.showError('Usuario o contraseña incorrectos');
          }, 1000);
        }
      })
    }
  }

}