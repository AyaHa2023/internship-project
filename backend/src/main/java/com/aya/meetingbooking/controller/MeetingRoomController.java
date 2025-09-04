package com.aya.meetingbooking.controller;

import com.aya.meetingbooking.dto.MeetingRoomDto;
import com.aya.meetingbooking.service.MeetingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
public class MeetingRoomController {

    private final MeetingRoomService roomService;

    @Autowired
    public MeetingRoomController(MeetingRoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<MeetingRoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public MeetingRoomDto getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MeetingRoomDto createRoom(@RequestBody MeetingRoomDto dto) {
        return roomService.createRoom(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MeetingRoomDto updateRoom(@PathVariable Long id, @RequestBody MeetingRoomDto dto) {
        return roomService.updateRoom(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @GetMapping("/search")
    public List<MeetingRoomDto> searchRooms(@RequestParam(required = false) Integer minCapacity,
                                            @RequestParam(required = false) String location) {
        return roomService.searchRooms(minCapacity, location);
    }



}
