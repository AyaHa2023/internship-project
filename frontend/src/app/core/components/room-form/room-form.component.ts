// src/app/core/components/room-form/room-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { RoomModel } from '../../models/room.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent {
  newRoom: Partial<RoomModel> = { roomName: '', roomLocation: '', capacity: 1 };
  loading = false;
  error: string | null = null;

  constructor(private roomService: RoomService, private router: Router) {}

  save(): void {
    this.loading = true;
    this.error = null;
    this.roomService.create(this.newRoom as RoomModel).subscribe({
      next: () => {
        this.loading = false;
        alert('Room created');
        this.router.navigate(['/rooms']);
      },
      error: (err: any) => {
        console.error('Error creating room', err);
        this.error = err?.error?.message || err?.message || 'Failed to create room';
        this.loading = false;
      }
    });
  }
}
