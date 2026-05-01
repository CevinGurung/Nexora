package com.nexora.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String fullName;

    private String phoneNumber;
    
    private String address;

    public Customer() {}

    public Customer(User user, String fullName, String phoneNumber, String address) {
        this.user = user;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    public static CustomerBuilder builder() {
        return new CustomerBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public static class CustomerBuilder {
        private User user;
        private String fullName;
        private String phoneNumber;
        private String address;

        public CustomerBuilder user(User user) { this.user = user; return this; }
        public CustomerBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public CustomerBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public CustomerBuilder address(String address) { this.address = address; return this; }
        public Customer build() { return new Customer(user, fullName, phoneNumber, address); }
    }
}
