// src/app/core/models/reservation.model.ts

export interface ReservationRequest {
  userId: number | null;
  roomId: number;
  date: string;      // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
}
export interface ReservationResponse {
  reservationId: number;   // matches backend Long
  userId: number;
  roomId: number;
  roomName: string;        // matches backend
  date: string;
  startTime: string;
  endTime: string;
  status?: string;         // optional in TS, backend always sets "BOOKED" or "CANCELED"
  createdAt?: string;      // optional, if you want timestamps later
}

