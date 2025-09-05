// src/app/core/components/room/room.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RoomService } from '../../services/room.service';
import { RoomModel } from '../../models/room.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  private roomService = inject(RoomService);
  public auth = inject(AuthService);

  rooms: RoomModel[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void { this.loadRooms(); }

  loadRooms(): void {
    this.loading = true;
    this.roomService.getAll().subscribe({
      next: data => { this.rooms = data; this.loading = false; },
      error: (err: any) => { this.error = err?.message || 'Failed to load rooms'; this.loading = false; }
    });
  }

  deleteRoom(id?: number) {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this room?')) return;
    this.roomService.delete(id).subscribe({
      next: () => this.loadRooms(),
      error: (err: any) => alert('Delete failed: ' + (err?.error || err?.message))
    });
  }
}
