import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { ReservationResponse } from '../../models/reservation.model';
import { ReservationRequest } from '../../models/reservation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css']
})
export class ReservationAdminComponent implements OnInit {
  private reservationService = inject(ReservationService);

  reservations: ReservationResponse[] = [];
  error: string | null = null;
  loading = false;

  searchTerm: string = ""; // could be ID or email

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.reservationService.listAll().subscribe({
      next: data => {
        // sort reservations by newest first
        this.reservations = data.sort(
          (a, b) => b.reservationId - a.reservationId
        );
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.message || 'Failed to load reservations';
        this.loading = false;
      }
    });
  }


  search() {
    if (!this.searchTerm) {
      this.loadAll();
      return;
    }

    // if numeric -> search by ID
    if (!isNaN(Number(this.searchTerm))) {
      this.reservationService.listByUserId(Number(this.searchTerm)).subscribe({
        next: data => this.reservations = data,
        error: () => this.error = "No reservations found for user ID " + this.searchTerm
      });
    } else {
      // otherwise -> search by email
      this.reservationService.listByEmail(this.searchTerm).subscribe({
        next: data => this.reservations = data,
        error: () => this.error = "No reservations found for email " + this.searchTerm
      });
    }
  }

  cancel(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe({
      next: () => this.ngOnInit(),
      error: err => alert('Cancel failed: ' + (err?.message || 'unknown'))
    });
  }
  restore(reservation: ReservationResponse) {
    const newReservation: ReservationRequest = {
      roomId: reservation.roomId,
      date: reservation.date,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      userId: reservation.userId
    };

    this.reservationService.create(newReservation).subscribe({
      next: () => this.ngOnInit(),
      error: (err: any) =>
        alert('Restore failed: ' + (err?.message || 'unknown'))
    });
  }


}
