package com.nexora.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String shopName;

    private String description;
    
    private String phoneNumber;

    public Vendor() {}

    public Vendor(User user, String shopName, String description, String phoneNumber) {
        this.user = user;
        this.shopName = shopName;
        this.description = description;
        this.phoneNumber = phoneNumber;
    }

    public static VendorBuilder builder() {
        return new VendorBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public static class VendorBuilder {
        private User user;
        private String shopName;
        private String description;
        private String phoneNumber;

        public VendorBuilder user(User user) { this.user = user; return this; }
        public VendorBuilder shopName(String shopName) { this.shopName = shopName; return this; }
        public VendorBuilder description(String description) { this.description = description; return this; }
        public VendorBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public Vendor build() { return new Vendor(user, shopName, description, phoneNumber); }
    }
}
