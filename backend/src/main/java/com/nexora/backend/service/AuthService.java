package com.nexora.backend.service;

import com.nexora.backend.dto.AuthResponse;
import com.nexora.backend.dto.LoginRequest;
import com.nexora.backend.dto.RegisterRequest;
import com.nexora.backend.model.*;
import com.nexora.backend.repository.CustomerRepository;
import com.nexora.backend.repository.UserRepository;
import com.nexora.backend.repository.VendorRepository;
import com.nexora.backend.security.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, 
                       VendorRepository vendorRepository, 
                       CustomerRepository customerRepository, 
                       PasswordEncoder passwordEncoder, 
                       JwtProvider jwtProvider, 
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AuthResponse registerVendor(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_VENDOR)
                .build();
        userRepository.save(user);

        Vendor vendor = Vendor.builder()
                .user(user)
                .shopName(request.getShopName())
                .description(request.getDescription())
                .phoneNumber(request.getPhoneNumber())
                .build();
        vendorRepository.save(vendor);

        String token = jwtProvider.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public AuthResponse registerCustomer(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_CUSTOMER)
                .build();
        userRepository.save(user);

        Customer customer = Customer.builder()
                .user(user)
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .build();
        customerRepository.save(customer);

        String token = jwtProvider.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtProvider.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
