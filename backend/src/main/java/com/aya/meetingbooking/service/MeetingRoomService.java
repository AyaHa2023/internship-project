package com.aya.meetingbooking.service;

import com.aya.meetingbooking.dto.MeetingRoomDto;
import com.aya.meetingbooking.entity.MeetingRoom;
import com.aya.meetingbooking.mapper.MeetingRoomMapper;
import com.aya.meetingbooking.repository.MeetingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;




@Service
public class MeetingRoomService {

    private final MeetingRoomRepository meetingRoomRepo;
    private final MeetingRoomMapper roomMapper;

    @Autowired
    public MeetingRoomService(MeetingRoomRepository meetingRoomRepo, MeetingRoomMapper roomMapper) {
        this.meetingRoomRepo = meetingRoomRepo;
        this.roomMapper = roomMapper;
    }

    public List<MeetingRoomDto> getAllRooms() {
        return meetingRoomRepo.findAll().stream()
                .map(roomMapper::toDto)
                .collect(Collectors.toList());
    }

    public MeetingRoomDto getRoomById(Long id) {
        MeetingRoom room = meetingRoomRepo.findById(id).orElseThrow();
        return roomMapper.toDto(room);
    }
    public MeetingRoomDto createRoom(MeetingRoomDto dto) {
        MeetingRoom room = roomMapper.toEntity(dto);
        MeetingRoom saved = meetingRoomRepo.save(room);
        return roomMapper.toDto(saved);
    }

    public MeetingRoomDto updateRoom(Long id, MeetingRoomDto dto) {
        MeetingRoom room = meetingRoomRepo.findById(id).orElseThrow();
        room.setRoomName(dto.getRoomName());
        room.setCapacity(dto.getCapacity());
        room.setRoomLocation(dto.getRoomLocation());
        MeetingRoom updated = meetingRoomRepo.save(room);
        return roomMapper.toDto(updated);
    }

    public Map<String, String> deleteRoom(Long id) {
        MeetingRoom room = meetingRoomRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found"));

        meetingRoomRepo.delete(room);

        return Map.of("message", "Room deleted successfully");
    }


    public List<MeetingRoomDto> searchRooms(Integer minCapacity, String locationContains) {
        List<MeetingRoom> rooms;
        if (minCapacity != null && locationContains != null && !locationContains.isBlank()) {
            rooms = meetingRoomRepo.findByCapacityGreaterThanEqualAndRoomLocationContainingIgnoreCase(minCapacity, locationContains);
        } else if (minCapacity != null) {
            rooms = meetingRoomRepo.findByCapacityGreaterThanEqual(minCapacity);
        } else if (locationContains != null && !locationContains.isBlank()) {
            rooms = meetingRoomRepo.findByRoomLocationContainingIgnoreCase(locationContains);
        } else {
            rooms = meetingRoomRepo.findAll();
        }
        return rooms.stream().map(roomMapper::toDto).collect(Collectors.toList());
    }


}
