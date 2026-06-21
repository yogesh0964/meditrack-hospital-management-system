package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.dto.LoginRequest;
import com.yogesh.meditrack.dto.RegisterRequest;
import com.yogesh.meditrack.entity.Role;
import com.yogesh.meditrack.entity.User;
import com.yogesh.meditrack.repository.RoleRepository;
import com.yogesh.meditrack.repository.UserRepository;
import com.yogesh.meditrack.security.JwtUtil;
import com.yogesh.meditrack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl
        implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public String register(
            RegisterRequest request){

        Role role =
                roleRepository.findByName(
                                "PATIENT")
                        .orElseThrow();

        User user = new User();

        user.setName(
                request.getName());

        user.setEmail(
                request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(role);

        userRepository.save(user);

        return "User Registered";
    }

    @Override
    public String login(
            LoginRequest request){

        User user =
                userRepository.findByEmail(
                                request.getEmail())
                        .orElseThrow();

        if(passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())){

            return jwtUtil.generateToken(
                    user.getEmail());
        }

        throw new RuntimeException(
                "Invalid Credentials");
    }
}
