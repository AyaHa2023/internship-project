import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { RoomService } from '../../services/room.service';
import { RoomModel } from '../../models/room.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card class="update-room-card" style="max-width:720px; margin: 24px auto; padding:16px;">
      <h2>Update Room</h2>

      <div *ngIf="loading">Loading room...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <form *ngIf="room">
        <mat-form-field appearance="fill" style="display:block; width:100%; margin-bottom:12px;">
          <mat-label>Room Name</mat-label>
          <input matInput [(ngModel)]="room.roomName" name="roomName" />
        </mat-form-field>

        <mat-form-field appearance="fill" style="display:block; width:100%; margin-bottom:12px;">
          <mat-label>Location</mat-label>
          <input matInput [(ngModel)]="room.roomLocation" name="roomLocation" />
        </mat-form-field>

        <mat-form-field appearance="fill" style="display:block; width:100%; margin-bottom:12px;">
          <mat-label>Capacity</mat-label>
          <input matInput type="number" [(ngModel)]="room.capacity" name="capacity" />
        </mat-form-field>

        <div style="margin-top:16px;">
          <button mat-raised-button color="primary" (click)="save()" type="button">Save</button>
          <button mat-button (click)="cancel()" type="button">Cancel</button>
        </div>
      </form>
    </mat-card>
  `
})
export class UpdateRoomComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roomService = inject(RoomService);
  public auth = inject(AuthService);

  room: RoomModel | null = null;
  loading = false;
  error: string | null = null;
  private id!: number;

  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('id');
    this.id = raw ? Number(raw) : NaN;
    if (!this.id || isNaN(this.id)) {
      this.router.navigate(['/rooms']);
      return;
    }

    this.loading = true;
    this.roomService.getById(this.id).subscribe({
      next: (r) => { this.room = r; this.loading = false; },
      error: (err) => { this.error = 'Failed to load room'; this.loading = false; console.error(err); }
    });
  }

  save(): void {
    if (!this.room) return;
    this.roomService.update(this.id, this.room).subscribe({
      next: () => {
        // success -> go back to list
        // you can replace alert with snackbar later
        alert('Room updated successfully');
        this.router.navigate(['/rooms']);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.error = err?.error?.message || err?.message || 'Update failed';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/rooms']);
  }
}
