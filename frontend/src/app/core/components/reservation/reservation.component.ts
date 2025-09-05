import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';   // ✅ import Router

import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { ReservationRequest } from '../../models/reservation.model';
import { RoomModel } from '../../models/room.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private auth = inject(AuthService);
  private roomService = inject(RoomService);
  private router = inject(Router);   // ✅ inject router

  rooms: RoomModel[] = [];
  error: string | null = null;

  model: ReservationRequest = {
    userId: 0,
    roomId: 0,
    date: '',
    startTime: '',
    endTime: ''
  };

  ngOnInit() {
    this.roomService.getAll().subscribe({
      next: (data) => (this.rooms = data),
      error: (err) => (this.error = err.message)
    });

    const uid = this.auth.getUserId();
    if (uid) this.model.userId = uid;
  }

  submit() {
    const payload = {
      ...this.model,
      userId: this.auth.getUserId()
    };

    console.log('Reservation payload:', payload);  // <--- add this

    this.reservationService.create(payload).subscribe({
      next: (res) => {
        console.log('Reservation created:', res);
        alert('Reservation created successfully!');
        this.router.navigate(['/reservations']);
      },
      error: (err) => {
        console.error('Reservation error:', err);
        alert('Failed to create reservation. Please try again.');
      }
    });


}


}
