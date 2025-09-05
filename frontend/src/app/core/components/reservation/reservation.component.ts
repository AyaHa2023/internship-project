import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';   // ✅ import this
import { CommonModule } from '@angular/common';

import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { ReservationRequest } from '../../models/reservation.model';
import { RoomModel } from '../../models/room.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],   // ✅ add FormsModule here
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private auth = inject(AuthService);
  private roomService = inject(RoomService);

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
    this.reservationService.create(this.model).subscribe({
      next: () => alert('Reservation created!'),
      error: (err) => {
        console.error('Reservation error:', err);
        alert('Failed to create reservation. Check console for details.');
      }
    });
  }
}
