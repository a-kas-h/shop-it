package com.example.shopit.dto;

import com.example.shopit.entity.StoreOwner;

import java.time.LocalDateTime;

public class StoreOwnershipDto {
    private Long id;
    private StoreDto store;
    private StoreOwner.Role role;
    private String permissions;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StoreOwnershipDto() {}

    public StoreOwnershipDto(Long id, StoreDto store, StoreOwner.Role role, String permissions, Boolean isActive, 
                            LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.store = store;
        this.role = role;
        this.permissions = permissions;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StoreDto getStore() {
        return store;
    }

    public void setStore(StoreDto store) {
        this.store = store;
    }

    public StoreOwner.Role getRole() {
        return role;
    }

    public void setRole(StoreOwner.Role role) {
        this.role = role;
    }

    public String getPermissions() {
        return permissions;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
