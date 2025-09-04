// src/app/core/models/reservation.model.ts
export interface ReservationRequest {
  userId: number | null; // can be null if server derives from token
  roomId: number;
  date: string; // ISO or yyyy-mm-dd depending on backend
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "10:00"
}

export interface ReservationResponse {
  id: number;
  userId: number;
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
  // additional fields optional:
  createdAt?: string;
  status?: string;
}
