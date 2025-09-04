package com.aya.meetingbooking.config;

import com.aya.meetingbooking.entity.AppUser;
import com.aya.meetingbooking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                AppUser aya = new AppUser("aya", "ayahachana2023@gmail.com", passwordEncoder.encode("mypassword"), "ROLE_ADMIN");
                AppUser yasmine = new AppUser("yasmine", "yasminejedidi03@gmail.com", passwordEncoder.encode("herpassword"), "ROLE_ADMIN");
                AppUser louay = new AppUser("louay", "louay.zeidi@medtech.com", passwordEncoder.encode("hispassword"), "ROLE_USER");
                userRepository.saveAll(List.of(aya, yasmine, louay));
            }
        };
    }
}
