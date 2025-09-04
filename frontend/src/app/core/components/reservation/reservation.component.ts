// src/app/core/components/reservation/reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ReservationService } from '../../services/reservation.service';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ReservationRequest } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  form: FormGroup;
  rooms: any[] = [];
  loading = false;
  error: string | null = null;
  roomIdFromQuery?: number;
  currentUserId?: number | null = null;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public auth: AuthService
  ) {
    this.form = this.fb.group({
      roomId: [null, Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // load rooms (roomService.getAll() must point to correct /api/rooms)
    this.roomService.getAll().subscribe({
      next: (r: any[]) => this.rooms = r,
      error: (_: any) => this.rooms = []
    });

    // preselect room from query param
    this.route.queryParams.subscribe(params => {
      const rid = params['roomId'];
      if (rid) {
        this.roomIdFromQuery = Number(rid);
        this.form.patchValue({ roomId: this.roomIdFromQuery });
      }
    });

    // get current user id via /users/me
    this.userService.getMe().subscribe({
      next: (u: any) => this.currentUserId = u?.id ?? null,
      error: (_: any) => this.currentUserId = null
    });
  }

  submit(): void {
    if (this.form.invalid || !this.currentUserId) {
      this.error = 'Please fill the form and ensure you are logged in.';
      return;
    }

    this.loading = true;
    this.error = null;

    const payload: ReservationRequest = {
      userId: this.currentUserId!,
      roomId: Number(this.form.value.roomId),
      date: this.form.value.date,
      startTime: this.form.value.startTime,
      endTime: this.form.value.endTime
    };

    this.reservationService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Reservation created successfully.');
        this.router.navigate(['/reservations']);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error || err?.message || 'Failed to create reservation';
      }
    });
  }
}
