package com.celmade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.celmade.dto.LoginRequest;
import com.celmade.dto.LoginResponse;
import com.celmade.entity.User;
import com.celmade.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    // @Autowired private JwtUtil jwtUtil; // JWT 유틸은 추후 추가

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.findByUsername(request.getUsername());
        if (user == null || !userService.checkPassword(user, request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        // String token = jwtUtil.generateToken(user); // JWT 발급(추후)
        String token = "dummy-jwt-token"; // 임시 토큰
        return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getRole()));
    }
} 