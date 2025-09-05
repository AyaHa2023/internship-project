// src/app/core/models/reservation.model.ts

export interface ReservationRequest {
  userId: number | null;
  roomId: number;
  date: string;      // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
}

export interface ReservationResponse {
  reservationId: number;   // align with backend
  userId: number;
  roomId: number;
  roomName: string;        // align with backend
  date: string;
  startTime: string;
  endTime: string;
  status?: string;
  createdAt?: string;
}
