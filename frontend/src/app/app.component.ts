import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="showNavbar()"></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  private router = inject(Router);
  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
