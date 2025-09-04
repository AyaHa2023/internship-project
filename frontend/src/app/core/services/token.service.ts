import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const USERNAME_KEY = 'auth_username';
const ROLES_KEY = 'auth_roles';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string): void {
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveRoles(roles: string[]): void {
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const raw = localStorage.getItem(ROLES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  public clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLES_KEY);
  }

  // helper to check if user has role
  public hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
  saveUserId(id: number) { localStorage.setItem('userId', String(id)); }
  getUserId(): number | null { const v = localStorage.getItem('userId'); return v ? Number(v) : null; }

}
