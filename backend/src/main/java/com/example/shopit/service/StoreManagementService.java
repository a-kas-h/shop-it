package com.example.shopit.service;

import com.example.shopit.dto.InventoryUpdateDto;
import com.example.shopit.dto.StoreRegistrationDto;
import com.example.shopit.entity.*;
import com.example.shopit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class StoreManagementService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreOwnerRepository storeOwnerRepository;

    @Autowired
    private StoreOwnerAuthRepository storeOwnerAuthRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public Store registerStore(StoreRegistrationDto registrationDto) {
        // Find the authenticated store owner by email
        StoreOwnerAuth storeOwnerAuth = storeOwnerAuthRepository.findByEmailAndIsActive(registrationDto.getOwnerEmail(), true)
                .orElseThrow(() -> new RuntimeException("Store owner not found or account not active. Please register first."));

        // Create store
        Store store = new Store();
        store.setName(registrationDto.getStoreName());
        store.setAddress(registrationDto.getAddress());
        store.setCity(registrationDto.getCity());
        store.setState(registrationDto.getState());
        store.setPostalCode(registrationDto.getPostalCode());
        store.setCountry(registrationDto.getCountry());
        store.setPhone(registrationDto.getPhone());
        store.setEmail(registrationDto.getEmail());
        store.setWebsite(registrationDto.getWebsite());
        store.setLatitude(registrationDto.getLatitude());
        store.setLongitude(registrationDto.getLongitude());
        store.setOpeningHours(registrationDto.getOpeningHours());
        store.setCreatedAt(LocalDateTime.now());
        store.setUpdatedAt(LocalDateTime.now());

        Store savedStore = storeRepository.save(store);

        // Create store ownership
        StoreOwner storeOwner = new StoreOwner(storeOwnerAuth, savedStore, StoreOwner.Role.OWNER);
        storeOwner.setPermissions("{\"manage_inventory\": true, \"manage_store\": true, \"view_analytics\": true, \"manage_staff\": true}");
        storeOwnerRepository.save(storeOwner);

        return savedStore;
    }

    public Store updateStore(Long storeId, String email, Store storeUpdate) {
        // Verify ownership
        Optional<StoreOwner> ownership = storeOwnerRepository.findByStoreOwnerAuthEmailAndStoreId(email, storeId);
        if (ownership.isEmpty()) {
            throw new RuntimeException("Access denied. You don't own this store.");
        }

        Store existingStore = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        // Update store fields
        existingStore.setName(storeUpdate.getName());
        existingStore.setAddress(storeUpdate.getAddress());
        existingStore.setCity(storeUpdate.getCity());
        existingStore.setState(storeUpdate.getState());
        existingStore.setPostalCode(storeUpdate.getPostalCode());
        existingStore.setPhone(storeUpdate.getPhone());
        existingStore.setEmail(storeUpdate.getEmail());
        existingStore.setWebsite(storeUpdate.getWebsite());
        existingStore.setOpeningHours(storeUpdate.getOpeningHours());
        existingStore.setUpdatedAt(LocalDateTime.now());

        return storeRepository.save(existingStore);
    }

    public Inventory updateInventory(Long storeId, String email, InventoryUpdateDto inventoryUpdate) {
        // Verify ownership
        Optional<StoreOwner> ownership = storeOwnerRepository.findByStoreOwnerAuthEmailAndStoreId(email, storeId);
        if (ownership.isEmpty()) {
            throw new RuntimeException("Access denied");
        }

        // Find existing inventory item
        Optional<Inventory> existingInventory = inventoryRepository.findByStoreIdAndProductId(storeId, inventoryUpdate.getProductId());
        
        if (existingInventory.isEmpty()) {
            throw new RuntimeException("Inventory item not found");
        }

        Inventory inventory = existingInventory.get();
        inventory.setQuantity(inventoryUpdate.getQuantity());
        if (inventoryUpdate.getPrice() != null) {
            inventory.setPrice(inventoryUpdate.getPrice());
        }
        inventory.setLastUpdated(LocalDateTime.now());

        // Update product dates if provided
        if (inventoryUpdate.getManufacturingDate() != null || inventoryUpdate.getExpiryDate() != null) {
            Product product = inventory.getProduct();
            if (inventoryUpdate.getManufacturingDate() != null) {
                product.setManufacturingDate(inventoryUpdate.getManufacturingDate());
            }
            if (inventoryUpdate.getExpiryDate() != null) {
                product.setExpiryDate(inventoryUpdate.getExpiryDate());
            }
            productRepository.save(product);
        }

        return inventoryRepository.save(inventory);
    }

    public Inventory addInventoryItem(Long storeId, String email, InventoryUpdateDto inventoryItem) {
        // Verify ownership
        Optional<StoreOwner> ownership = storeOwnerRepository.findByStoreOwnerAuthEmailAndStoreId(email, storeId);
        if (ownership.isEmpty()) {
            throw new RuntimeException("Access denied");
        }

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        Product product = productRepository.findById(inventoryItem.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if inventory item already exists
        Optional<Inventory> existingInventory = inventoryRepository.findByStoreIdAndProductId(storeId, inventoryItem.getProductId());
        if (existingInventory.isPresent()) {
            throw new RuntimeException("Product already exists in inventory. Use update instead.");
        }

        // Create new inventory item
        Inventory inventory = new Inventory();
        inventory.setStore(store);
        inventory.setProduct(product);
        inventory.setQuantity(inventoryItem.getQuantity());
        inventory.setPrice(inventoryItem.getPrice());
        inventory.setLastUpdated(LocalDateTime.now());

        return inventoryRepository.save(inventory);
    }

    public void deleteInventoryItem(Long storeId, Long productId, String email) {
        // Verify ownership
        Optional<StoreOwner> ownership = storeOwnerRepository.findByStoreOwnerAuthEmailAndStoreId(email, storeId);
        if (ownership.isEmpty()) {
            throw new RuntimeException("Access denied");
        }

        Optional<Inventory> inventory = inventoryRepository.findByStoreIdAndProductId(storeId, productId);
        if (inventory.isEmpty()) {
            throw new RuntimeException("Inventory item not found");
        }

        inventoryRepository.delete(inventory.get());
    }
}