// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = `${environment.apiBaseUrl}/api/v1/users`;

  constructor(private http: HttpClient) {}

  // exported methods for consumers
  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.base);
  }

  getById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.base}/${id}`);
  }

  getMe(): Observable<UserModel> {
    // endpoint `/me` assumed in backend
    return this.http.get<UserModel>(`${this.base}/me`);
  }
}
