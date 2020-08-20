package edu.rmit.app.service;


import edu.rmit.app.model.*;
import edu.rmit.app.repo.UserRepository;
import edu.rmit.common.model.AuthProvider;
import edu.rmit.common.utils.UsernameGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class WorkerService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Transactional
    public Map<String, String> saveEmployee(WorkerRegistrationRequest request){
        User user = new User();

        String username = UsernameGeneratorUtil.generateUsername("w");
        String password = String.valueOf(UsernameGeneratorUtil.generateRandomNumbers());

        user.setUsername(username);
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(password));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setVerified(true);
        user.setRole(Role.WORKER);
        user.setAuthProvider(AuthProvider.LOCAL);

        userRepository.save(user);

        Map<String, String> res = new HashMap<>();

        res.put("username", username);
        res.put("password", password);

        return res;
    };
}
