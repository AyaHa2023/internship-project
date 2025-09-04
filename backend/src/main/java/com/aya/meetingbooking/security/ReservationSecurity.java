package com.aya.meetingbooking.security;

import com.aya.meetingbooking.service.ReservationService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class ReservationSecurity {

    private final ReservationService reservationService;

    public ReservationSecurity(ReservationService reservationService) {
        this.reservationService = reservationService;
    }


    public boolean isOwner(Long reservationId, Authentication authentication) {
        Long ownerId = reservationService.getReservationOwnerId(reservationId);
        if (ownerId == null) return false;
        String currentUsername = authentication.getName();
        return reservationService.isUserOwner(currentUsername, ownerId);
    }
}
