// src/app/core/pages/home/home.component.ts
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private router = inject(Router);
  public auth = inject(AuthService);

  // Helpers used in template
  isAdmin(): boolean { return this.auth.hasRole('ROLE_ADMIN'); }
  isLogged(): boolean { return this.auth.isLoggedIn(); }

  goMakeReservation() { this.router.navigate(['/reservations/create']); }
  goMyReservations() { this.router.navigate(['/reservations']); }
  goAllReservations() { this.router.navigate(['/reservations/admin']); }
  goRooms() { this.router.navigate(['/rooms']); }
}
