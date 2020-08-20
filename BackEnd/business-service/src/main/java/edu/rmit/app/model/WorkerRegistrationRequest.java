package edu.rmit.app.model;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class WorkerRegistrationRequest {

    @NotBlank
    @Email(message = "Please enter a valid email address!")
    private String email;

    @NotBlank
    private String name;

    @NotBlank
    private String businessId;

    private String address;

    private String phone;
}
