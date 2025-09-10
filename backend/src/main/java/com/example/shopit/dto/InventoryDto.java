package com.example.shopit.dto;


import java.math.BigDecimal;

public class InventoryDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String imageUrl;
    private Integer quantity;
    private BigDecimal price;
    private java.time.LocalDate manufacturingDate;
    private java.time.LocalDate expiryDate;
    private boolean isExpired;
    private long daysUntilExpiry;

    public InventoryDto(Long id, String name, String description, String category, String imageUrl, 
                       Integer quantity, BigDecimal price, java.time.LocalDate manufacturingDate, 
                       java.time.LocalDate expiryDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.price = price;
        this.manufacturingDate = manufacturingDate;
        this.expiryDate = expiryDate;
        this.isExpired = expiryDate != null && expiryDate.isBefore(java.time.LocalDate.now());
        this.daysUntilExpiry = expiryDate != null ? 
            java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), expiryDate) : -1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public java.time.LocalDate getManufacturingDate() {
        return manufacturingDate;
    }

    public void setManufacturingDate(java.time.LocalDate manufacturingDate) {
        this.manufacturingDate = manufacturingDate;
    }

    public java.time.LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(java.time.LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isExpired() {
        return isExpired;
    }

    public void setExpired(boolean expired) {
        isExpired = expired;
    }

    public long getDaysUntilExpiry() {
        return daysUntilExpiry;
    }

    public void setDaysUntilExpiry(long daysUntilExpiry) {
        this.daysUntilExpiry = daysUntilExpiry;
    }
}
