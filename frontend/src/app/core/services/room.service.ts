// src/app/core/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RoomModel } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private base = `${environment.apiBaseUrl}/api/v1/rooms`; // <-- add /v1 to match backend


  constructor(private http: HttpClient) {}

  getAll(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.base);
  }

  getById(id: number): Observable<RoomModel> {
    return this.http.get<RoomModel>(`${this.base}/${id}`);
  }

  create(room: RoomModel): Observable<RoomModel> {
    return this.http.post<RoomModel>(this.base, room);
  }

  update(id: number, room: RoomModel): Observable<RoomModel> {
    return this.http.put<RoomModel>(`${this.base}/${id}`, room);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
