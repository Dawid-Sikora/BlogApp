package com.app.blog.web.request;

import java.util.Set;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.UniqueElements;

public class SignupRequest {

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 20, message = "The username must be between 3 and 20 characters.")
    private String username;

    @NotBlank(message = "Email is required.")
    @Size(max = 50)
    @Email(message = "This is not a valid email.")
    private String email;

    private Set<String> role;

    @NotBlank(message = "Password is required.")
    @Size(min = 6, max = 40, message = "The password must be between 6 and 40 characters.")
    private String password;

    @NotBlank(message = "This field is required.")
    private String confirmPassword;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Set<String> getRole() {
        return this.role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}