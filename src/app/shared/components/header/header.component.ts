import { Component, HostListener  } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardProfileComponent } from '../card-profile/card-profile.component';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [
    ButtonModule,
    CardProfileComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = false;
  isAuthenticated: boolean = false;

  constructor(
    private router:Router,
    private userService: UserService
  ){}

  ngOnInit(){
    this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      console.log(isAuthenticated);
      
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isScrolled = offset > 0;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  register(){
    this.router.navigate(['/register']);
  }
  login(){
    this.router.navigate(['/login'])
  }
}
