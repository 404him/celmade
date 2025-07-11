package com.celmade.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import com.celmade.entity.User;
import com.celmade.repository.UserRepository;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        log.info("Found user: {}", user != null ? user.getUsername() : "null");
        return user;
    }

    public boolean checkPassword(User user, String rawPassword) {
        boolean matches = passwordEncoder.matches(rawPassword, user.getPassword());
        log.info("Password check for user {}: {}", user.getUsername(), matches);
        log.info("Raw password: {}", rawPassword);
        log.info("Encoded password: {}", user.getPassword());
        return matches;
    }
} 