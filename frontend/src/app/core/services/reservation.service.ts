// src/app/core/services/reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ReservationRequest, ReservationResponse } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  // ✅ match backend base URL
  private base = `${environment.apiBaseUrl}/api/v1/reservations`;

  constructor(private http: HttpClient) {}

  create(req: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.base, req);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // ✅ fetch only reservations for a specific user
  listMine(userId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.base}/user/${userId}`);
  }

  // ✅ fetch all reservations (admin only)
  listAll(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.base);
  }

  getById(id: number): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.base}/${id}`);
  }

  // by user ID
  listByUserId(userId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.base}/user/${userId}`);
  }

// by email
  listByEmail(email: string): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.base}/user/email/${email}`);
  }

}
