package com.app.blog.controllers;

import com.app.blog.dataBase.models.Roles;
import com.app.blog.dataBase.models.Role;
import com.app.blog.dataBase.models.User;
import com.app.blog.dataBase.repositories.RoleRepository;
import com.app.blog.dataBase.repositories.UserRepository;
import com.app.blog.security.jwt.JwtUtils;
import com.app.blog.security.services.UserDetailsImpl;
import com.app.blog.web.request.LoginRequest;
import com.app.blog.web.request.SignupRequest;
import com.app.blog.web.response.MessageResponseHandler;
import com.app.blog.web.response.JwtResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult, HttpServletResponse response) {

        // fields validation
        if(bindingResult.hasErrors()){
            Map<String, String> errors = MessageResponseHandler.generateFieldValidationErrors(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        // is user exists
        if (!userRepository.existsByEmail(loginRequest.getEmail())) {
            Map<String, String> errors = MessageResponseHandler.generateUserWithEmailNotExists();
            return ResponseEntity.badRequest().body(errors);
        }

        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        } catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body(MessageResponseHandler.generateBadCredentialsMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        // add cookie to the response
        handleCookie(response, jwt,3600);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity
                .ok(new JwtResponse("Don't send a token", userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, BindingResult bindingResult) {

        // fields validation, must be first to check if password is not empty
        if(bindingResult.hasErrors()){
            Map<String, String> errors = MessageResponseHandler.generateFieldValidationErrors(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        // confirm password and password match
        if(!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())){
            Map<String, String> errors = MessageResponseHandler.generateConfirmPasswordError();
            return ResponseEntity.badRequest().body(errors);
        }

        // email already in use validation
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            Map<String, String> errors = MessageResponseHandler.generateEmailInUseError();
            return ResponseEntity.badRequest().body(errors);
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles;
        //by default, if roles are null create user with USER role
        if (strRoles == null) {
            roles = new HashSet<>();
            Role role = roleRepository.findByName(Roles.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(role);
        }else {
            roles = getRoles(strRoles);
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(MessageResponseHandler.generateRegistrationSuccessMessage());
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuthentication(HttpServletRequest request) {
        String jwt = jwtUtils.parseJwt(request);

        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        handleCookie(response, "",0);
        return ResponseEntity.ok("User logout success.");
    }

    private Set<Role> getRoles(Set<String> strRoles) {
        Set<Role> newRoles = new HashSet<>();
        strRoles.forEach(role -> {
            if (role.equals("admin")) {
                Role adminRole = roleRepository.findByName(Roles.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                newRoles.add(adminRole);
            } else {
                Role userRole = roleRepository.findByName(Roles.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                newRoles.add(userRole);
            }
        });
        return newRoles;
    }

    private void handleCookie(HttpServletResponse response, String jwt, long maxAge){
        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(maxAge)
                .sameSite("None")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }
}
