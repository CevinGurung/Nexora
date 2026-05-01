package com.nexora.backend.dto;

public class RegisterRequest {
    private String email;
    private String password;
    private String shopName;
    private String description;
    private String fullName;
    private String phoneNumber;
    private String address;

    public RegisterRequest() {}

    public RegisterRequest(String email, String password, String shopName, String description, String fullName, String phoneNumber, String address) {
        this.email = email;
        this.password = password;
        this.shopName = shopName;
        this.description = description;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
