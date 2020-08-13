package edu.rmit.gateway.model;


import org.springframework.security.core.GrantedAuthority;


public enum Role implements GrantedAuthority {

    ADMIN, OWNER, WORKER, CUSTOMER;

    @Override
    public String getAuthority() {
        return name();
    }
}
