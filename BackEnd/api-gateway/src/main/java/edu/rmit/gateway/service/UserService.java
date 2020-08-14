package edu.rmit.gateway.service;

import edu.rmit.gateway.error.BadRequestException;
import edu.rmit.gateway.error.NotFoundException;
import edu.rmit.gateway.model.AuthProvider;
import edu.rmit.gateway.model.RegistrationRequest;
import edu.rmit.gateway.model.Role;
import edu.rmit.gateway.model.User;
import edu.rmit.gateway.repo.UserRepository;
import edu.rmit.gateway.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Transactional
    public String authenticate(String username, String password){
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (!optionalUser.isPresent()) throw new NotFoundException("Username does not exist!");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtTokenProvider.createToken(authentication);
    }

    @Transactional
    public void saveUser(RegistrationRequest registrationRequest){

        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setName(registrationRequest.getName());
        user.setPhone(registrationRequest.getPhone());
        user.setAddress(registrationRequest.getAddress());
        user.setRole(Role.CUSTOMER);
        user.setAuthProvider(AuthProvider.LOCAL);

        userRepository.save(user);
    }
}
