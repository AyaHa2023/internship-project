package com.aya.meetingbooking.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationRequestDto {

    private Long userId;
    private Long roomId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    public ReservationRequestDto() {
    }

    public ReservationRequestDto(Long userId, Long roomId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        this.userId = userId;
        this.roomId = roomId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
