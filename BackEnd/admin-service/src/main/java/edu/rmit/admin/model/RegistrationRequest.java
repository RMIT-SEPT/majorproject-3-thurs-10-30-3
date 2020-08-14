package edu.rmit.admin.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class RegistrationRequest {

    @NotBlank
    @Email(message = "Please enter a valid email address!")
    private String email;

    @NotBlank
    private String name;

    private String address;

    private String phone;
}
