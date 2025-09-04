import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean | UrlTree {
    if (this.auth.isLoggedIn() && this.auth.hasRole('ROLE_ADMIN')) return true;
    return this.router.parseUrl('/home');
  }
}
