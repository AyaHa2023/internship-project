// src/app/core/components/reservation-list/reservation-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { ReservationResponse } from '../../models/reservation.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: ReservationResponse[] = [];
  loading = false;
  error: string | null = null;
  userId: number | null = null;

  constructor(private reservationService: ReservationService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    this.error = null;
    this.reservationService.listMine(this.userId ?? undefined).subscribe({
      next: (data: ReservationResponse[]) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching reservations', err);
        this.error = err?.error?.message || err?.message || 'Failed to load reservations';
        this.loading = false;
      }
    });
  }

  cancel(id: number): void {
    if (!confirm('Cancel this reservation?')) return;
    this.reservationService.cancel(id).subscribe({
      next: () => this.loadReservations(),
      error: (err: any) => {
        console.error('Error cancelling reservation', err);
        this.error = err?.error?.message || err?.message || 'Cancel failed';
      }
    });
  }
}
