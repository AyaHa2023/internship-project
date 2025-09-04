package com.aya.meetingbooking.mapper;

import com.aya.meetingbooking.dto.UserDto;
import com.aya.meetingbooking.entity.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(AppUser user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    public AppUser toEntity(UserDto dto) {
        AppUser user = new AppUser();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        return user;
    }
}
