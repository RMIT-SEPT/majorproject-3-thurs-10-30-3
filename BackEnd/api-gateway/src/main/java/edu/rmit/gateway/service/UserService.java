package edu.rmit.gateway.service;

import edu.rmit.gateway.error.CustomException;
import edu.rmit.gateway.model.JwtToken;
import edu.rmit.gateway.model.Role;
import edu.rmit.gateway.model.User;
import edu.rmit.gateway.repo.JwtTokenRepository;
import edu.rmit.gateway.repo.UserRepository;
import edu.rmit.gateway.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenRepository jwtTokenRepository;

    public String login(String username, String password) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,
                password));

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            throw new CustomException("Invalid username or password.", HttpStatus.UNAUTHORIZED);
        }

        User user = optionalUser.get();
        //NOTE: normally we dont need to add "ROLE_" prefix. Spring does automatically for us.
        //Since we are using custom token using JWT we should add ROLE_ prefix
        String token =  jwtTokenProvider.createToken(username, user.getRoles().stream()
                .map((Role role)-> "ROLE_"+ role.getRole()).filter(Objects::nonNull).collect(Collectors.toList()));

        return token;
    }

    public User saveUser(User user) {

        Optional<User> existingUsername = userRepository.findByUsername(user.getUsername());
        if (existingUsername.isPresent()) {
            throw new CustomException("This username already exists!", HttpStatus.BAD_REQUEST);
        }

        Optional<User> existingEmail = userRepository.findByUsername(user.getUsername());
        if (existingEmail.isPresent()) {
            throw new CustomException("This email already exists!", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean logout(String token) {
        jwtTokenRepository.delete(new JwtToken(token));
        return true;
    }

    public void testToken(String token){
        jwtTokenProvider.getToken(token);
    }

    public Boolean isValidToken(String token) {
        return jwtTokenProvider.validateToken(token);
    }

    public String createNewToken(String token) {
        String username = jwtTokenProvider.getUsername(token);
        List<String> roleList = jwtTokenProvider.getRoleList(token);
        String newToken =  jwtTokenProvider.createToken(username, roleList);
        return newToken;
    }
}
