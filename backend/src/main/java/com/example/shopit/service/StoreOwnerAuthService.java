package com.example.shopit.service;

import com.example.shopit.dto.StoreOwnerLoginDto;
import com.example.shopit.dto.StoreOwnerRegistrationDto;
import com.example.shopit.entity.StoreOwnerAuth;
import com.example.shopit.repository.StoreOwnerAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class StoreOwnerAuthService {

    @Autowired
    private StoreOwnerAuthRepository storeOwnerAuthRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public StoreOwnerAuth registerStoreOwner(StoreOwnerRegistrationDto registrationDto) {
        // Check if email already exists
        if (storeOwnerAuthRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new store owner auth
        StoreOwnerAuth storeOwnerAuth = new StoreOwnerAuth();
        storeOwnerAuth.setEmail(registrationDto.getEmail());
        storeOwnerAuth.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
        storeOwnerAuth.setFirstName(registrationDto.getFirstName());
        storeOwnerAuth.setLastName(registrationDto.getLastName());
        storeOwnerAuth.setPhoneNumber(registrationDto.getPhoneNumber());
        storeOwnerAuth.setBusinessName(registrationDto.getBusinessName());

        return storeOwnerAuthRepository.save(storeOwnerAuth);
    }

    public Map<String, Object> authenticateStoreOwner(StoreOwnerLoginDto loginDto) {
        Optional<StoreOwnerAuth> storeOwnerAuthOpt = storeOwnerAuthRepository.findByEmailAndIsActive(loginDto.getEmail(), true);
        
        if (storeOwnerAuthOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        StoreOwnerAuth storeOwnerAuth = storeOwnerAuthOpt.get();
        
        if (!passwordEncoder.matches(loginDto.getPassword(), storeOwnerAuth.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Update last login
        storeOwnerAuth.setLastLogin(LocalDateTime.now());
        storeOwnerAuthRepository.save(storeOwnerAuth);

        // Generate session token (simple UUID for now)
        String sessionToken = UUID.randomUUID().toString();
        
        Map<String, Object> response = new HashMap<>();
        response.put("storeOwnerAuth", storeOwnerAuth);
        response.put("sessionToken", sessionToken);
        response.put("message", "Login successful");

        return response;
    }

    public Optional<StoreOwnerAuth> findByEmail(String email) {
        return storeOwnerAuthRepository.findByEmail(email);
    }

    public Optional<StoreOwnerAuth> findById(Long id) {
        return storeOwnerAuthRepository.findById(id);
    }
}
