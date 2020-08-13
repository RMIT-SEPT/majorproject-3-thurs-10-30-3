package edu.rmit.gateway.controller;


import edu.rmit.gateway.model.*;
import edu.rmit.gateway.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        String token = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest){

        userService.saveUser(registrationRequest);

        Map<String, String> res = new HashMap<>();

        res.put("success", "true");
        res.put("message", "User Created! Please login with new credentials!");

        return ResponseEntity.ok(res);
    }

}
