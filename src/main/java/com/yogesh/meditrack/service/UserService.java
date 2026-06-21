package com.yogesh.meditrack.service;

import com.yogesh.meditrack.dto.LoginRequest;
import com.yogesh.meditrack.dto.RegisterRequest;

public interface UserService {

    String register(
            RegisterRequest request);

    String login(
            LoginRequest request);

}