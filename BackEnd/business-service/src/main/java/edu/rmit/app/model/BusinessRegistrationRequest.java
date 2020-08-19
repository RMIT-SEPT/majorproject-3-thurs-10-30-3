package edu.rmit.app.model;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BusinessRegistrationRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String owner;

    private String address;

    private String description;
}
