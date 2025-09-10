package com.example.shopit.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    private String category;

    private String barcode;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "manufacturing_date")
    private java.time.LocalDate manufacturingDate;

    @Column(name = "expiry_date")
    private java.time.LocalDate expiryDate;

    public Product() {
    }

    public Product(String name, String description, String category, String barcode, String imageUrl, 
                   java.time.LocalDate manufacturingDate, java.time.LocalDate expiryDate) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.barcode = barcode;
        this.imageUrl = imageUrl;
        this.manufacturingDate = manufacturingDate;
        this.expiryDate = expiryDate;
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

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    // Helper method to check if product is expired
    public boolean isExpired() {
        return expiryDate != null && expiryDate.isBefore(java.time.LocalDate.now());
    }

    // Helper method to get days until expiry
    public long getDaysUntilExpiry() {
        if (expiryDate == null) return -1;
        return java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), expiryDate);
    }
}
