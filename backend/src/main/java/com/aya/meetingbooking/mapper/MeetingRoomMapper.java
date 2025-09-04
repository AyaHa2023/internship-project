package com.aya.meetingbooking.mapper;

import com.aya.meetingbooking.dto.MeetingRoomDto;
import com.aya.meetingbooking.entity.MeetingRoom;
import org.springframework.stereotype.Component;

@Component
public class MeetingRoomMapper {

    public MeetingRoomDto toDto(MeetingRoom room) {
        return new MeetingRoomDto(
                room.getRoomId(),
                room.getRoomName(),
                room.getRoomLocation(),
                room.getCapacity()
        );
    }

    public MeetingRoom toEntity(MeetingRoomDto dto) {
        MeetingRoom room = new MeetingRoom();
        room.setRoomId(dto.getId());
        room.setRoomName(dto.getRoomName());
        room.setRoomLocation(dto.getRoomLocation());
        room.setCapacity(dto.getCapacity());
        return room;
    }
}
