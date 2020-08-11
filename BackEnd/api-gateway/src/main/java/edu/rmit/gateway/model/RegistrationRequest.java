package edu.rmit.gateway.model;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class RegistrationRequest {

    @NotBlank
    @Email(message = "Please enter a valid email address!")
    private String email;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    private String address;

    private String phone;
}
