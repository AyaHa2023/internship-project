  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from '../../../environments/environment';
  import { Observable } from 'rxjs';
  import { RoomModel } from '../models/room.model';

  @Injectable({ providedIn: 'root' })
  export class RoomService {
    private base = `${environment.apiBaseUrl}/api/rooms`;

    constructor(private http: HttpClient) {}
    getAll(): Observable<RoomModel[]> { return this.http.get<RoomModel[]>(this.base); }
    getById(id: number): Observable<RoomModel> { return this.http.get<RoomModel>(`${this.base}/${id}`); }
    delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
  }
