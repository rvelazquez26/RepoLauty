import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'shared-card-profile',
  standalone: true,
  imports: [DropdownModule, CardModule],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.scss',
})
export class CardProfileComponent {
  public name = localStorage.getItem('userName');
  public role = localStorage.getItem('userRole');

  public initial: string = '';

  options: any[] = [
    { name: 'Perfil', value: 'logout' },
    { name: 'Mis favoritos', value: 'logout' },
    { name: 'Cerrar sesión', value: 'logout' },
  ];

  constructor(private router: Router, private authService: AuthService) {
    this.initial = this.getInitial(this.name);
  }

  getInitial(name: any): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }

  logout() {
    this.authService.logout();
  }
}
