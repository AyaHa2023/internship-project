
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ReservationRequest, ReservationResponse } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private base = `${environment.apiBaseUrl}/api/reservations`;

  constructor(private http: HttpClient) {}


  create(req: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.base, req);
  }


  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }


  listMine(userId?: number): Observable<ReservationResponse[]> {
    const url = userId ? `${this.base}?userId=${userId}` : this.base;
    return this.http.get<ReservationResponse[]>(url);
  }


  getById(id: number): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.base}/${id}`);
  }
}
