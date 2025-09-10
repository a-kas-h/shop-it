package com.example.shopit.controller;

import com.example.shopit.dto.StoreOwnerLoginDto;
import com.example.shopit.dto.StoreOwnerRegistrationDto;
import com.example.shopit.entity.StoreOwnerAuth;
import com.example.shopit.service.StoreOwnerAuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/store-owner-auth")
@CrossOrigin(origins = "*")
public class StoreOwnerAuthController {

    @Autowired
    private StoreOwnerAuthService storeOwnerAuthService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody StoreOwnerRegistrationDto registrationDto) {
        try {
            StoreOwnerAuth storeOwnerAuth = storeOwnerAuthService.registerStoreOwner(registrationDto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Store owner registered successfully");
            response.put("storeOwnerAuth", Map.of(
                "id", storeOwnerAuth.getId(),
                "email", storeOwnerAuth.getEmail(),
                "firstName", storeOwnerAuth.getFirstName(),
                "lastName", storeOwnerAuth.getLastName(),
                "businessName", storeOwnerAuth.getBusinessName()
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody StoreOwnerLoginDto loginDto) {
        try {
            Map<String, Object> authResult = storeOwnerAuthService.authenticateStoreOwner(loginDto);
            StoreOwnerAuth storeOwnerAuth = (StoreOwnerAuth) authResult.get("storeOwnerAuth");
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("sessionToken", authResult.get("sessionToken"));
            response.put("storeOwner", Map.of(
                "id", storeOwnerAuth.getId(),
                "email", storeOwnerAuth.getEmail(),
                "firstName", storeOwnerAuth.getFirstName(),
                "lastName", storeOwnerAuth.getLastName(),
                "businessName", storeOwnerAuth.getBusinessName() != null ? storeOwnerAuth.getBusinessName() : ""
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Store-Owner-Email") String email) {
        try {
            var storeOwnerAuth = storeOwnerAuthService.findByEmail(email);
            if (storeOwnerAuth.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Store owner not found");
                return ResponseEntity.notFound().build();
            }

            StoreOwnerAuth auth = storeOwnerAuth.get();
            Map<String, Object> response = new HashMap<>();
            response.put("storeOwner", Map.of(
                "id", auth.getId(),
                "email", auth.getEmail(),
                "firstName", auth.getFirstName(),
                "lastName", auth.getLastName(),
                "phoneNumber", auth.getPhoneNumber() != null ? auth.getPhoneNumber() : "",
                "businessName", auth.getBusinessName() != null ? auth.getBusinessName() : ""
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch profile");
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
