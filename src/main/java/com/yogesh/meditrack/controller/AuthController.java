package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.dto.LoginRequest;
import com.yogesh.meditrack.dto.RegisterRequest;
import com.yogesh.meditrack.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/test")
    public String test() {
        return "Auth Working";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid
            @RequestBody RegisterRequest request){

        return ResponseEntity.ok(
                userService.register(request));

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid
            @RequestBody LoginRequest request){

        return ResponseEntity.ok(
                userService.login(request));

    }
}