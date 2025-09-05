import { Component, OnInit, inject } from '@angular/core';
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
  private reservationService = inject(ReservationService);
  private auth = inject(AuthService);

  reservations: ReservationResponse[] = [];
  error: string | null = null;
  loading = false;

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (!userId) {
      this.error = 'Not logged in';
      return;
    }

    this.loading = true;
    this.reservationService.listMine(userId).subscribe({
      next: (data: ReservationResponse[]) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.message || 'Failed to load reservations';
        this.loading = false;
      }
    });
  }

  cancel(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe({
      next: () => this.ngOnInit(),
      error: (err: any) => alert('Cancel failed: ' + (err?.message || 'unknown'))
    });
  }
}
