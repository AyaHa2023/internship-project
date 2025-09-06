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
    const toReq = (r: ReservationResponse) => {
      // ---- DATE ----
      let date: string;
      if (typeof r.date === 'string') {
        date = r.date;
      } else if (r.date && typeof r.date === 'object' && 'year' in r.date) {
        date = `${r.date.year}-${String(r.date.month).padStart(2, '0')}-${String(r.date.day).padStart(2, '0')}`;
      } else {
        throw new Error('Invalid date format');
      }

      // ---- START TIME ----
      let startTime: string;
      if (typeof r.startTime === 'string') {
        startTime = r.startTime.slice(0, 5); // HH:mm
      } else if (r.startTime && typeof r.startTime === 'object' && 'hour' in r.startTime) {
        startTime = `${String(r.startTime.hour).padStart(2, '0')}:${String(r.startTime.minute).padStart(2, '0')}`;
      } else {
        throw new Error('Invalid startTime format');
      }

      // ---- END TIME ----
      let endTime: string;
      if (typeof r.endTime === 'string') {
        endTime = r.endTime.slice(0, 5);
      } else if (r.endTime && typeof r.endTime === 'object' && 'hour' in r.endTime) {
        endTime = `${String(r.endTime.hour).padStart(2, '0')}:${String(r.endTime.minute).padStart(2, '0')}`;
      } else {
        throw new Error('Invalid endTime format');
      }

      return {
        userId: r.userId,
        roomId: r.roomId,
        date,
        startTime,
        endTime
      };
    };

    this.reservationService.create(toReq(reservation)).subscribe({
      next: (created) => {
        // Remove the canceled reservation card
        this.reservations = this.reservations.filter(
          (r) => r.reservationId !== reservation.reservationId
        );

        // Insert the restored one at the top
        this.reservations = [created, ...this.reservations];
      },
      error: (err: any) =>
        alert('Restore failed: ' + (err?.message || 'unknown')),
    });
  }





}
