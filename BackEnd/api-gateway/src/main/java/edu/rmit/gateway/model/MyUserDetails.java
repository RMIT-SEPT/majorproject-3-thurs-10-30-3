package edu.rmit.gateway.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class MyUserDetails implements UserDetails {


    private String username;
    private String password;
    private boolean isActive;
    private boolean isLocked;
    private boolean isExpired;
    private boolean isEnabled;
    private List<GrantedAuthority> grantedAuthorities;

    public MyUserDetails(String username, String password,boolean active, boolean isLocked, boolean isExpired, boolean isEnabled, String [] authorities) {
        this.username = username;
        this.password = password;
        this.isActive = active;
        this.isLocked = isLocked;
        this.isExpired = isExpired;
        this.isEnabled = isEnabled;
        this.grantedAuthorities = AuthorityUtils.createAuthorityList(authorities);
    }

    public MyUserDetails(String username,  String [] authorities) {
        this.username = username;
        this.grantedAuthorities = AuthorityUtils.createAuthorityList(authorities);
    }

    public MyUserDetails() {
        super();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !isExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
