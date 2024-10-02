import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardSwitchGuard implements CanActivate {
  constructor(private router: Router) {}

  private validateDashboard(): boolean | Promise<boolean> {
    const userRole = localStorage.getItem('user_role') ?? '';
    switch (userRole) {
      case 'Administrador':
        this.router.navigate(['main/admin']);
        return true;
        break;
      case 'Representante ACARA':
        this.router.navigate(['main/acara']);
        return true;
        break;
      case 'Presidente Regional':
        this.router.navigate(['main/prereg']);
        return true;
        break;
      case 'Representante Concesionaria':
        this.router.navigate(['main/repcon']);
        return true;
        break;
      default:
        this.router.navigate(['auth/login']);
        return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    return this.validateDashboard();
  }
}