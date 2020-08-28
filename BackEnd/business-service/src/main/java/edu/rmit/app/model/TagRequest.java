package edu.rmit.app.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class TagRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String userId;

    @NotBlank
    private String businessId;
}
