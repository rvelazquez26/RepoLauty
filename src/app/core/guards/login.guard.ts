import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
@Injectable({
  providedIn: 'root', 
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // Método canActivate que se ejecuta antes de que se cargue una ruta protegida por este guard
  canActivate(): boolean {
    // Verifica si el usuario ya está autenticado
    if (this.authService.isLoggedIn()) {
      // Si el usuario está autenticado, lo redirige al Dashboard (o cualquier ruta protegida)
      this.router.navigate(['/dashboard']);
      // Retorna 'false', bloqueando el acceso a la ruta actual (login o register)
      return false;
    }
    // Si el usuario no está autenticado, permite el acceso a la ruta (login/register)
    return true;
  }
}
