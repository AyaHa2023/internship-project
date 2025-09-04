package com.aya.meetingbooking.controller;

import com.aya.meetingbooking.dto.UserDto;
import com.aya.meetingbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserDto> getAllUsers() { return userService.getAllUsers(); }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id) { return userService.getUserById(id); }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.status(401).build();
        UserDto dto = userService.getUserByUsername(userDetails.getUsername());
        return ResponseEntity.ok(dto);
    }
}
