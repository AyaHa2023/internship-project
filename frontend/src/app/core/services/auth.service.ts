// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient, private tokens: TokenService) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { username, password }).pipe(
      map(res => {
        this.tokens.saveToken(res.token);
        // decode token safely to extract username, roles, maybe userId
        try {
          const decoded: any = jwtDecode(res.token);
          const roles: string[] = Array.isArray(decoded?.roles) ? decoded.roles : [];
          const sub = decoded?.sub ?? decoded?.username ?? username;
          const userId = decoded?.userId ?? decoded?.id ?? null;
          this.tokens.saveUsername(sub);
          this.tokens.saveRoles(roles);
          if (userId !== null && userId !== undefined) {
            this.tokens.saveUserId(Number(userId));
          }
        } catch {
          // fallback
          this.tokens.saveUsername(username);
          this.tokens.saveRoles([]);
        }
      })
    );
  }

  logout(): void {
    this.tokens.clear();
  }

  isLoggedIn(): boolean {
    return !!this.tokens.getToken();
  }

  hasRole(role: string): boolean {
    return this.tokens.hasRole(role);
  }

  // Provide a typed getUserId used by components
  getUserId(): number | null {
    const id = this.tokens.getUserId();
    return id !== null && id !== undefined ? Number(id) : null;
  }
}
