import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['auth/login']);
        return false;
      }
      return true;
    }
  }
  