import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../../services/room.service';
import { RoomModel } from '../../models/room.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-room',
  standalone: true, // <-- make standalone
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  private roomService = inject(RoomService);
  auth = inject(AuthService); // no "private", defaults to public


  rooms: RoomModel[] = [];
  error: string | null = null;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.roomService.getAll().subscribe({
      next: (data: RoomModel[]) => {
        this.rooms = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.message || 'Failed to load rooms';
        this.loading = false;
      }
    });
  }

  deleteRoom(id: number) {
    this.roomService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err: any) => alert('Delete failed: ' + (err?.message || 'unknown'))
    });
  }

  hasAdminRole() {
    return this.auth.hasRole('ROLE_ADMIN');
  }
}
