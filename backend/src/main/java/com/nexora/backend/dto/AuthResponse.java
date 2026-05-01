package com.nexora.backend.dto;

import com.nexora.backend.model.Role;

public class AuthResponse {
    private String token;
    private String email;
    private Role role;

    public AuthResponse() {}

    public AuthResponse(String token, String email, Role role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public static class AuthResponseBuilder {
        private String token;
        private String email;
        private Role role;

        public AuthResponseBuilder token(String token) { this.token = token; return this; }
        public AuthResponseBuilder email(String email) { this.email = email; return this; }
        public AuthResponseBuilder role(Role role) { this.role = role; return this; }
        public AuthResponse build() { return new AuthResponse(token, email, role); }
    }
}
