// src/app/core/models/room.model.ts
export interface RoomModel {
  // id must be required (not optional) so assignment to typed arrays won't fail
  id: number;
  roomName: string;
  roomLocation?: string;
  capacity?: number;

}
