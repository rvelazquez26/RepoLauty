import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardProfileComponent } from '../card-profile/card-profile.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [ButtonModule, CardProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isScrolled = false;
  public isLogged = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    if (localStorage.getItem('Token')?.length) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isScrolled = offset > 0;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToContact(scrollTo: string): void {
    if (this.router.url === '/main/dashboard') {
      // Si ya estamos en la ruta, hacemos el scroll directamente sin timeout
      this.scrollToSection(scrollTo);
    } else {
      // Si no estamos en la ruta, navegamos a 'main/dashboard' y luego realizamos el scroll con timeout
      this.router.navigate(['/main/dashboard']).then(() => {
        // Espera a que la navegación termine antes de ejecutar el scroll
        setTimeout(() => {
          this.scrollToTop();
          this.scrollToSection(scrollTo);
        }, 200); // Ajusta el tiempo según lo que necesites
      });
    }
  }

  private scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    console.log(section);
    
    if (section) {
      // Obtener la posición actual del elemento
      const elementPosition = section.getBoundingClientRect().top;
      
      // Obtener la posición actual del scroll
      const offsetPosition = window.pageYOffset + elementPosition - 150; // Ajusta el valor según lo que necesites
  
      // Realizar el scroll a la posición calculada
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  

  register() {
    this.router.navigate(['auth/register']);
  }
  login() {
    this.router.navigate(['auth/login']);
  }
}
