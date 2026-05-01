package com.nexora.backend.controller;

import com.nexora.backend.dto.AuthResponse;
import com.nexora.backend.dto.LoginRequest;
import com.nexora.backend.dto.RegisterRequest;
import com.nexora.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/vendor")
    public ResponseEntity<AuthResponse> registerVendor(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerVendor(request));
    }

    @PostMapping("/register/customer")
    public ResponseEntity<AuthResponse> registerCustomer(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerCustomer(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
