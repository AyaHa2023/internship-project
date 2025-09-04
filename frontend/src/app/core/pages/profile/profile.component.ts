import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);

  user?: UserModel;
  loading = true;
  error?: string;

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: u => { this.user = u; this.loading = false; },
      error: () => { this.error = 'Failed to load profile'; this.loading = false; }
    });
  }
}
