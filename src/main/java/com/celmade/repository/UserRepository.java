package com.celmade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.celmade.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
} 