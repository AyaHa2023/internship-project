package com.aya.meetingbooking.service;

import com.aya.meetingbooking.dto.ReservationRequestDto;
import com.aya.meetingbooking.dto.ReservationResponseDto;
import com.aya.meetingbooking.entity.AppUser;
import com.aya.meetingbooking.entity.MeetingRoom;
import com.aya.meetingbooking.entity.Reservation;
import com.aya.meetingbooking.repository.ReservationRepository;
import com.aya.meetingbooking.repository.UserRepository;
import com.aya.meetingbooking.repository.MeetingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepo;
    private final UserRepository userRepo;
    private final MeetingRoomRepository roomRepo;
    private final EmailService emailService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepo,
                              UserRepository userRepo,
                              MeetingRoomRepository roomRepo,
                              EmailService emailService) {
        this.reservationRepo = reservationRepo;
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
        this.emailService = emailService;
    }

    public ReservationResponseDto bookRoom(ReservationRequestDto dto) {
        AppUser user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        MeetingRoom room = roomRepo.findById(dto.getRoomId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found"));

        // Check availability
        if (!isRoomAvailable(room.getRoomId(), dto.getDate(), dto.getStartTime(), dto.getEndTime())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not available at this time");
        }

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setMeetingRoom(room);
        reservation.setDate(dto.getDate());
        reservation.setStartTime(dto.getStartTime());
        reservation.setEndTime(dto.getEndTime());
        reservation.setStatus("BOOKED");

        Reservation saved = reservationRepo.save(reservation);


        try {
            String subject = "Reservation Confirmed";
            String body = "Your reservation for room " + room.getRoomName() + " on " +
                    dto.getDate() + " from " + dto.getStartTime() + " to " + dto.getEndTime() + " is confirmed.";
            emailService.sendConfirmationEmail(user.getEmail(), subject, body);
        } catch (Exception ignored) {}

        return toDto(saved);
    }

    public List<ReservationResponseDto> getUserReservations(Long userId) {
        return reservationRepo.findByUser_Id(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public boolean isRoomAvailable(Long roomId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        List<Reservation> conflicts = reservationRepo.findConflictingReservations(roomId, date, startTime, endTime);
        return conflicts.isEmpty();
    }

    public List<ReservationResponseDto> getRoomReservations(Long roomId) {
        return reservationRepo.findByMeetingRoom_RoomId(roomId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ReservationResponseDto> getAllReservations() {
        return reservationRepo.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ReservationResponseDto updateReservation(Long id, ReservationRequestDto dto) {
        Reservation reservation = reservationRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));

        MeetingRoom room = roomRepo.findById(dto.getRoomId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found"));


        if (!reservation.getDate().equals(dto.getDate()) ||
                !reservation.getStartTime().equals(dto.getStartTime()) ||
                !reservation.getEndTime().equals(dto.getEndTime())) {

            if (!isRoomAvailable(room.getRoomId(), dto.getDate(), dto.getStartTime(), dto.getEndTime())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not available at this new time");
            }
        }

        reservation.setMeetingRoom(room);
        reservation.setDate(dto.getDate());
        reservation.setStartTime(dto.getStartTime());
        reservation.setEndTime(dto.getEndTime());

        Reservation updated = reservationRepo.save(reservation);
        return toDto(updated);
    }

    public Map<String, String> cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));

        reservation.setStatus("CANCELED");
        reservationRepo.save(reservation);

        try {
            String email = reservation.getUser().getEmail();
            String subject = "Reservation Cancelled";
            String body = "Your reservation for room " + reservation.getMeetingRoom().getRoomName() + " on " +
                    reservation.getDate() + " from " + reservation.getStartTime() + " to " + reservation.getEndTime() +
                    " has been cancelled.";
            emailService.sendConfirmationEmail(email, subject, body);
        } catch (Exception ignored) {}

        return Map.of("message", "Reservation cancelled successfully");
    }


    public Long getReservationOwnerId(Long reservationId) {
        return reservationRepo.findById(reservationId)
                .map(reservation -> reservation.getUser().getId())
                .orElse(null);
    }

    public boolean isUserOwner(String username, Long ownerId) {
        AppUser user = userRepo.findById(ownerId).orElse(null);
        if (user == null) return false;
        return user.getUsername().equals(username);
    }


    private ReservationResponseDto toDto(Reservation reservation) {
        ReservationResponseDto dto = new ReservationResponseDto();
        dto.setReservationId(reservation.getReservationId());
        dto.setUserId(reservation.getUser().getId());
        dto.setRoomId(reservation.getMeetingRoom().getRoomId());
        dto.setRoomName(reservation.getMeetingRoom().getRoomName());
        dto.setDate(reservation.getDate());
        dto.setStartTime(reservation.getStartTime());
        dto.setEndTime(reservation.getEndTime());
        dto.setStatus(reservation.getStatus());
        return dto;
    }

    public List<ReservationResponseDto> getUserReservationsByEmail(String email) {
        AppUser user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return reservationRepo.findByUser_Id(user.getId())
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }


}
