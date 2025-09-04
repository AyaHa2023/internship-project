import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { ProfileComponent } from './core/pages/profile/profile.component';
import { RoomComponent } from './core/components/room/room.component';
import { ReservationComponent } from './core/components/reservation/reservation.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'rooms', component: RoomComponent },
  { path: 'reservations/create', component: ReservationComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationComponent, canActivate: [AuthGuard] }, // you can adapt to a list view later
  // admin routes (example)
  { path: 'admin/rooms', component: RoomComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'home' }
];
