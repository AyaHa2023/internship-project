
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public router = inject(Router);
  private auth = inject(AuthService);


  public get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  onLogoutClick(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onProfileClick(): void {
    this.router.navigate(['/profile']);
  }
}
