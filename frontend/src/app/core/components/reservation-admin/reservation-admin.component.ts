// src/app/core/components/reservation-admin/reservation-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { ReservationResponse } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css']
})
export class ReservationAdminComponent implements OnInit {
  reservations: ReservationResponse[] = [];
  loading = false;
  error: string | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = null;
    // when called without userId, backend returns all reservations (admin)
    this.reservationService.listMine().subscribe({
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
      next: () => this.loadAll(),
      error: (err: any) => {
        console.error('Error cancelling reservation', err);
        this.error = err?.error?.message || err?.message || 'Cancel failed';
      }
    });
  }
}
