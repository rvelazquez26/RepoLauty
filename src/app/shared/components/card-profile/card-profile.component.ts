import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'shared-card-profile',
  standalone: true,
  imports: [
    DropdownModule,
    CardModule
  ],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.scss'
})
export class CardProfileComponent {

name: string = "Tiziana";
initial: string = '';

options: any[] = [ 
  { name: 'Cerrar sesión', value: 'logout' }
];

constructor(
  private router: Router,
  private userService: UserService
) {
  this.initial = this.getInitial(this.name);
}

getInitial(name: string): string {
  return name ? name.charAt(0).toUpperCase() : '';
}

logout() {
  this.userService.logout();
  this.router.navigate(['/login']);
}

}
