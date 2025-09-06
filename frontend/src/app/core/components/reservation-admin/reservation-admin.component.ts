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
    const formatDate = (d: any) => {
      if (typeof d === 'string') return d; // already fine
      return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
    };

    const formatTime = (t: any) => {
      if (typeof t === 'string') return t.slice(0, 5); // "HH:mm"
      return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}`;
    };

    const newReservation: ReservationRequest = {
      userId: reservation.userId,
      roomId: reservation.roomId,
      date: formatDate(reservation.date),
      startTime: formatTime(reservation.startTime),
      endTime: formatTime(reservation.endTime)
    };

    this.reservationService.create(newReservation).subscribe({
      next: () => this.ngOnInit(),
      error: (err: any) =>
        alert('Restore failed: ' + (err?.message || 'unknown'))
    });
  }




}
