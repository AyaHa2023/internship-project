package com.aya.meetingbooking.controller;

import com.aya.meetingbooking.dto.ReservationRequestDto;
import com.aya.meetingbooking.dto.ReservationResponseDto;
import com.aya.meetingbooking.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")

    @PostMapping
    public ReservationResponseDto createReservation(@Valid @RequestBody ReservationRequestDto requestDto) {
        System.out.println("DTO received: " + requestDto);   // debug
        ReservationResponseDto response = reservationService.bookRoom(requestDto);
        System.out.println("Reservation created: " + response);
        return response;
    }



    @GetMapping("/user/{userId}")
    public List<ReservationResponseDto> getReservationsForUser(@PathVariable Long userId) {
        return reservationService.getUserReservations(userId);
    }


    @GetMapping("/availability")
    public boolean checkAvailability(@RequestParam Long roomId,
                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime) {
        return reservationService.isRoomAvailable(roomId, date, startTime, endTime);
    }

    @GetMapping("/room/{roomId}")
    public List<ReservationResponseDto> getReservationsForRoom(@PathVariable Long roomId) {
        return reservationService.getRoomReservations(roomId);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<ReservationResponseDto> getAllReservations() {
        return reservationService.getAllReservations();
    }


@PreAuthorize("hasRole('ADMIN') or @reservationSecurity.isOwner(#reservationId, authentication)")
@DeleteMapping("/{reservationId}")
public ResponseEntity<Map<String, String>> cancelReservation(@PathVariable Long reservationId) {
    reservationService.cancelReservation(reservationId);
    return ResponseEntity.ok(Map.of("message", "Reservation deleted successfully"));
}

    @PreAuthorize("hasRole('ADMIN') or @reservationSecurity.isOwner(#id, authentication)")
    @PutMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> updateReservation(@PathVariable Long id, @RequestBody ReservationRequestDto dto) {
        ReservationResponseDto updated = reservationService.updateReservation(id, dto);
        return ResponseEntity.ok(updated);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/email/{email}")
    public List<ReservationResponseDto> getReservationsForUserByEmail(@PathVariable String email) {
        return reservationService.getUserReservationsByEmail(email);
    }


}
