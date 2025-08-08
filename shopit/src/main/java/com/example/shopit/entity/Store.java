package com.example.shopit.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="stores")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 50)
    private String state;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Column(length = 50)
    private String country = "India";

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String email;

    @Column(length = 255)
    private String website;

    @Column(name = "opening_hours", columnDefinition = "jsonb")
    private String openingHours;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    private List<Inventory> inventory;

    public Store() {}

    public Store(String name, String address, String city, String state, String postalCode, 
                 String phone, String email, Double latitude, Double longitude) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.phone = phone;
        this.email = email;
        this.latitude = latitude;
        this.longitude = longitude;
        this.country = "India";
        this.createdAt = java.time.LocalDateTime.now();
        this.updatedAt = java.time.LocalDateTime.now();
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public java.time.LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(java.time.LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Inventory> getInventory() {
        return inventory;
    }

    public void setInventory(List<Inventory> inventory) {
        this.inventory = inventory;
    }
}
