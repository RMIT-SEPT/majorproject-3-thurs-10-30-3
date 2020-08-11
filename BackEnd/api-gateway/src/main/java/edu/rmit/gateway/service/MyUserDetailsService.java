package edu.rmit.gateway.service;

import edu.rmit.gateway.error.CustomException;
import edu.rmit.gateway.model.MyUserDetails;
import edu.rmit.gateway.model.Role;
import edu.rmit.gateway.model.User;
import edu.rmit.gateway.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            throw new CustomException("Invalid username or password.", HttpStatus.UNAUTHORIZED);
        }

        User user = optionalUser.get();

        String [] authorities = new String[user.getRoles().size()];

        int count=0;

        for (Role role : user.getRoles()) {
            //NOTE: normally we dont need to add "ROLE_" prefix. Spring does automatically for us.
            //Since we are using custom token using JWT we should add ROLE_ prefix
            authorities[count] = "ROLE_" + role.getRole();
            count++;
        }
        MyUserDetails userDetails = new MyUserDetails(user.getEmail(),user.getPassword(), user.isActive(),
                user.isLocked(), user.isExpired(),user.isEnabled(),authorities);
        return userDetails;
    }



}

