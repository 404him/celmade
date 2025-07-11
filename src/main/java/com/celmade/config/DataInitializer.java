package com.celmade.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.celmade.entity.User;
import com.celmade.repository.UserRepository;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // 테스트용 관리자 계정이 없으면 생성
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                .name("관리자")
                .username("admin")
                .password(passwordEncoder.encode("admin123"))
                .role("ADMIN")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .build();
            
            userRepository.save(admin);
            System.out.println("테스트 관리자 계정이 생성되었습니다: admin / admin123");
        }
    }
} 