import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    InputIconModule,
    PasswordModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    CardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[]
})
export class RegisterComponent {

  registerForm!: FormGroup;
  constructor(
    private userService: UserService, 
    private fb: FormBuilder,
    private toast: ToastService,
    private router: Router
  ){}

ngOnInit(): void {
  this.registerForm = this.fb.group({
    idRol: 2,
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    mail: ['', Validators.required],
    password: ['', Validators.required]
  });
}

onSubmit(): void {
  console.log(this.registerForm.valid);
  
  if (this.registerForm.valid) {
    this.userService.postUser(this.registerForm.value).subscribe({
      next: (response: string) => {
        console.log('Mensaje:', response);
        this.toast.showSuccess(response);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.error('Error:', error);
        this.toast.showError('Ocurrió un error al registrar el usuario.');
      }
    });
  } 
}

onDashboard(){
  // this.userService.logout();
  this.router.navigate(['']);
}

}
