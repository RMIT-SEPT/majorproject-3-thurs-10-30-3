package edu.rmit.gateway.controller;


import edu.rmit.gateway.model.AuthResponse;
import edu.rmit.gateway.model.LoginRequest;
import edu.rmit.gateway.model.RegistrationRequest;
import edu.rmit.gateway.model.User;
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
        String token = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

        Map<String, String> res = new HashMap<>();

        res.put("success", "true");
        res.put("token", token);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization") String token){
        HttpHeaders headers = new HttpHeaders();
        if (userService.logout(token)) {
            headers.remove("Authorization");
            return new ResponseEntity<>(new AuthResponse("logged out"), headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new AuthResponse("Logout Failed"), headers, HttpStatus.NOT_MODIFIED);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest){

        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(registrationRequest.getPassword());
        user.setName(registrationRequest.getName());
        user.setPhone(registrationRequest.getPhone());
        user.setAddress(registrationRequest.getAddress());

        userService.saveUser(user);

        Map<String, String> res = new HashMap<>();

        res.put("success", "true");
        res.put("message", "User Created! Please login with new credentials!");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/current")
    public ResponseEntity<?> getCurrentUserInfo(@RequestHeader(value = "Authorization") String token){
        userService.testToken(token);
        return ResponseEntity.ok(token);
    }
}
