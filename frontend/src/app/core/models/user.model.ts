export interface UserModel {
  id?: number;
  username: string;
  email?: string;
  role?: string; // e.g. "ROLE_ADMIN" or "ROLE_USER"
}
