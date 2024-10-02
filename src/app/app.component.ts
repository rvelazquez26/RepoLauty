import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,    
    HeaderComponent,
    FooterComponent,],
})
export class AppComponent implements OnInit {
  title = 'Academy';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const activeRoute = this.router.routerState.snapshot.root;
        let route = activeRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        // Obtener el título de la ruta activa
        const title = route.data['title'] || this.title; // Fallback al título por defecto
        document.title = title; // Cambia el título del documento
      });
  }
}
