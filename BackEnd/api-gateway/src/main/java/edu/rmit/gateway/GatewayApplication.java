package edu.rmit.gateway;


import edu.rmit.common.model.AuthProvider;
import edu.rmit.gateway.config.AppProperties;
import edu.rmit.gateway.model.Role;
import edu.rmit.gateway.model.User;
import edu.rmit.gateway.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;


@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
@EnableMongoAuditing
@EnableConfigurationProperties({AppProperties.class})
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder encoder){
        return args -> {
            Optional<User> optionalUser = userRepository.findByUsername("admin");

            if (!optionalUser.isPresent()){
                User user = new User();

                user.setUsername("admin");
                user.setEmail("admin@gmail.com");
                user.setVerified(true);
                user.setRole(Role.ADMIN);
                user.setAuthProvider(AuthProvider.LOCAL);
                user.setName("Super Duper Admin");
                user.setPassword(encoder.encode("password"));

                userRepository.save(user);
            }
        };
    }
}
