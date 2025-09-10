package com.example.shopit.controller;

import com.example.shopit.dto.InventoryUpdateDto;
import com.example.shopit.dto.StoreRegistrationDto;
import com.example.shopit.dto.StoreOwnershipDto;
import com.example.shopit.dto.StoreDto;
import com.example.shopit.entity.*;
import com.example.shopit.repository.*;
import com.example.shopit.service.StoreManagementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/store-management")
@CrossOrigin(origins = "*")
public class StoreManagementController {

    @Autowired
    private StoreManagementService storeManagementService;

    @Autowired
    private StoreOwnerRepository storeOwnerRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    // Register a new store
    @PostMapping("/register")
    public ResponseEntity<?> registerStore(@Valid @RequestBody StoreRegistrationDto registrationDto) {
        try {
            Store store = storeManagementService.registerStore(registrationDto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Store registered successfully");
            response.put("storeId", store.getId());
            response.put("storeName", store.getName());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Get stores owned by current user
    @GetMapping("/debug/current-user")
    public ResponseEntity<Map<String, String>> debugCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String firebaseUid = extractFirebaseUid(authHeader);
            Map<String, String> response = new HashMap<>();
            response.put("firebaseUid", firebaseUid);
            response.put("message", "Current authenticated Firebase UID");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to extract Firebase UID");
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/my-stores")
    public ResponseEntity<List<StoreOwnershipDto>> getMyStores(@RequestHeader("Store-Owner-Email") String email) {
        try {
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Debug logging
            System.out.println("DEBUG: Received Store Owner Email: " + email);
            
            List<StoreOwner> storeOwnerships = storeOwnerRepository.findActiveStoresByEmail(email);
            System.out.println("DEBUG: Found " + storeOwnerships.size() + " store ownerships for email: " + email);
            
            // Convert entities to DTOs to avoid circular references
            List<StoreOwnershipDto> storeOwnershipDtos = storeOwnerships.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
                
            return ResponseEntity.ok(storeOwnershipDtos);
        } catch (Exception e) {
            System.err.println("ERROR in getMyStores: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get store details for management
    @GetMapping("/store/{storeId}")
    public ResponseEntity<?> getStoreForManagement(
            @PathVariable Long storeId,
            @RequestHeader("Store-Owner-Email") String email) {
        try {
            // Find store owner auth by email
            Optional<StoreOwner> ownership = storeOwnerRepository.findActiveStoresByEmail(email)
                .stream()
                .filter(so -> so.getStore().getId().equals(storeId))
                .findFirst();
                
            if (ownership.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Access denied. You don't own this store.");
                return ResponseEntity.status(403).body(error);
            }

            Store store = ownership.get().getStore();
            return ResponseEntity.ok(store);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch store details");
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Update store information
    @PutMapping("/store/{storeId}")
    public ResponseEntity<?> updateStore(
            @PathVariable Long storeId,
            @RequestHeader("Store-Owner-Email") String email,
            @Valid @RequestBody Store storeUpdate) {
        try {
            Store updatedStore = storeManagementService.updateStore(storeId, email, storeUpdate);
            return ResponseEntity.ok(updatedStore);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Get inventory for a store
    @GetMapping("/store/{storeId}/inventory")
    public ResponseEntity<?> getStoreInventory(
            @PathVariable Long storeId,
            @RequestHeader("Store-Owner-Email") String email) {
        try {
            // Find store owner auth by email and verify store ownership
            Optional<StoreOwner> ownership = storeOwnerRepository.findActiveStoresByEmail(email)
                .stream()
                .filter(so -> so.getStore().getId().equals(storeId))
                .findFirst();
                
            if (ownership.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Access denied");
                return ResponseEntity.status(403).body(error);
            }

            List<Inventory> inventory = inventoryRepository.findByStoreId(storeId);
            return ResponseEntity.ok(inventory);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch inventory");
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Update inventory item
    @PutMapping("/store/{storeId}/inventory")
    public ResponseEntity<?> updateInventory(
            @PathVariable Long storeId,
            @RequestHeader("Store-Owner-Email") String email,
            @Valid @RequestBody InventoryUpdateDto inventoryUpdate) {
        try {
            Inventory updatedInventory = storeManagementService.updateInventory(storeId, email, inventoryUpdate);
            return ResponseEntity.ok(updatedInventory);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Add new product to inventory
    @PostMapping("/store/{storeId}/inventory")
    public ResponseEntity<?> addInventoryItem(
            @PathVariable Long storeId,
            @RequestHeader("Store-Owner-Email") String email,
            @Valid @RequestBody InventoryUpdateDto inventoryItem) {
        try {
            Inventory newInventory = storeManagementService.addInventoryItem(storeId, email, inventoryItem);
            return ResponseEntity.ok(newInventory);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Delete inventory item
    @DeleteMapping("/store/{storeId}/inventory/{productId}")
    public ResponseEntity<?> deleteInventoryItem(
            @PathVariable Long storeId,
            @PathVariable Long productId,
            @RequestHeader("Store-Owner-Email") String email) {
        try {
            storeManagementService.deleteInventoryItem(storeId, productId, email);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Inventory item deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Get all products (for adding to inventory)
    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productRepository.findAll();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch products");
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    private String extractFirebaseUid(String authHeader) {
        // Extract Firebase UID from Authorization header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
    
    private StoreOwnershipDto convertToDto(StoreOwner storeOwner) {
        StoreOwnershipDto dto = new StoreOwnershipDto();
        dto.setId(storeOwner.getId());
        dto.setRole(storeOwner.getRole());
        dto.setPermissions(storeOwner.getPermissions());
        dto.setIsActive(storeOwner.getIsActive());
        dto.setCreatedAt(storeOwner.getCreatedAt());
        dto.setUpdatedAt(storeOwner.getUpdatedAt());
        
        // Convert Store entity to StoreDto
        if (storeOwner.getStore() != null) {
            StoreDto storeDto = new StoreDto();
            Store store = storeOwner.getStore();
            storeDto.setId(store.getId());
            storeDto.setName(store.getName());
            storeDto.setAddress(store.getAddress());
            storeDto.setCity(store.getCity());
            storeDto.setState(store.getState());
            storeDto.setPostalCode(store.getPostalCode());
            storeDto.setCountry(store.getCountry());
            storeDto.setPhone(store.getPhone());
            storeDto.setEmail(store.getEmail());
            storeDto.setWebsite(store.getWebsite());
            storeDto.setOpeningHours(store.getOpeningHours());
            storeDto.setLatitude(store.getLatitude());
            storeDto.setLongitude(store.getLongitude());
            storeDto.setCreatedAt(store.getCreatedAt());
            storeDto.setUpdatedAt(store.getUpdatedAt());
            
            dto.setStore(storeDto);
        }
        
        return dto;
    }
}