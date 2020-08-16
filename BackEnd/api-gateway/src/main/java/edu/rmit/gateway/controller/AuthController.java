package edu.rmit.gateway.controller;


import edu.rmit.common.errors.BadRequestException;
import edu.rmit.gateway.model.*;
import edu.rmit.gateway.repo.UserRepository;
import edu.rmit.gateway.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        String token = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest){

        Optional<User> existingEmail = userRepository.findByEmail(registrationRequest.getEmail());
        if (existingEmail.isPresent()){
            throw new BadRequestException("Email address is already taken!");
        }

        Optional<User> existingUsername = userRepository.findByUsername(registrationRequest.getUsername());
        if (existingUsername.isPresent()){
            throw new BadRequestException("Username is already taken!");
        }

        if (registrationRequest.getPhone() != null){
            Optional<User> existingPhone = userRepository.findByEmail(registrationRequest.getEmail());
            if (existingPhone.isPresent()){
                throw new BadRequestException("Phone # is already taken!");
            }
        }

        userService.saveUser(registrationRequest);

        Map<String, String> res = new HashMap<>();

        res.put("success", "true");
        res.put("message", "User Created! Please login with new credentials!");

        return ResponseEntity.ok(res);
    }

}
