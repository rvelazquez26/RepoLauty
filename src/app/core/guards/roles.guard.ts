import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  private checkRoles(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles: string[] = route.data['allowedRoles'] || [];
    const userRole = localStorage.getItem('user_role') ?? '';
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/main/index']);
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkRoles(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkRoles(route);
  }
}