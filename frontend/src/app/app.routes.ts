import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { HomeComponent } from './core/pages/home/home.component';
import { ReservationComponent } from './core/components/reservation/reservation.component';
import { ReservationListComponent } from './core/components/reservation-list/reservation-list.component';
import { ReservationAdminComponent } from './core/components/reservation-admin/reservation-admin.component';
import { RoomComponent } from './core/components/room/room.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UpdateRoomComponent } from './core/components/update-room/update-room.component';
 // <-- add this

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'reservations/create', component: ReservationComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard] },
  { path: 'admin/activity', component: ReservationAdminComponent, canActivate: [AdminGuard] },

  { path: 'rooms', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'rooms/update/:id', component: UpdateRoomComponent, canActivate: [AdminGuard] }, // <-- admin-only edit page

  { path: '**', redirectTo: 'login' }
];
