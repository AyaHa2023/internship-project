import { Component, OnInit, inject } from '@angular/core';
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
  private reservationService = inject(ReservationService);

  reservations: ReservationResponse[] = [];
  error: string | null = null;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.reservationService.listAll().subscribe({
      next: (data: ReservationResponse[]) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.message || 'Failed to load all reservations';
        this.loading = false;
      }
    });
  }

  cancel(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe({
      next: () => this.ngOnInit(), // reload list
      error: (err: any) => alert('Cancel failed: ' + (err?.message || 'unknown'))
    });
  }
}
