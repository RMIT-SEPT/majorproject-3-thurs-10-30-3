package edu.rmit.admin.service;

import edu.rmit.admin.model.RegistrationRequest;
import edu.rmit.admin.model.Role;
import edu.rmit.admin.model.User;
import edu.rmit.admin.repo.UserRepository;
import edu.rmit.common.model.AuthProvider;
import edu.rmit.common.utils.UsernameGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Transactional
    public Map<String, String> saveOwner(RegistrationRequest registrationRequest){
        User user = new User();

        String username = UsernameGeneratorUtil.generateUsername("b");
        String password = String.valueOf(UsernameGeneratorUtil.generateRandomNumbers());

        user.setUsername(username);
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(password));
        user.setName(registrationRequest.getName());
        user.setPhone(registrationRequest.getPhone());
        user.setAddress(registrationRequest.getAddress());
        user.setVerified(true);
        user.setRole(Role.OWNER);
        user.setAuthProvider(AuthProvider.LOCAL);

        userRepository.save(user);

        Map<String, String> res = new HashMap<>();

        res.put("username", username);
        res.put("password", password);

        return res;
    };

}
