package com.app.blog.web.response;

import com.app.blog.web.request.UIConstants;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

public class MessageResponseHandler {

    private static final String EMAIL_IN_USE_MESSAGE = "Email is already in use!";

    private static final String USER_NOT_EXISTS_MESSAGE = "User with this email not exists!";

    private static final String WRONG_CREDENTIALS_MESSAGE = "Wrong email or password!";

    private static final String REGISTRATION_SUCCESS_MESSAGE = "User registered successfully!";

    private static final String CONFIRM_PASSWORD_FIELD_MESSAGE = "Passwords do not match!";

    // generates error response based on fields validation.
    public static  Map<String, String> generateFieldValidationErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        bindingResult.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return errors;
    }

    // generates error response for email already in use case.
    public static Map<String, String> generateEmailInUseError() {
        Map<String, String> errors = new HashMap<>();
        errors.put(UIConstants.EMAIL_FIELD, EMAIL_IN_USE_MESSAGE);
        return errors;
    }

    // generates error response for not existing user.
    public static Map<String, String> generateUserWithEmailNotExists() {
        Map<String, String> errors = new HashMap<>();
        errors.put(UIConstants.EMAIL_FIELD, USER_NOT_EXISTS_MESSAGE);
        return errors;
    }

    // generates error response for bad email or password
    public static Map<String, String> generateBadCredentialsMessage() {
        Map<String, String> errors = new HashMap<>();
        errors.put(UIConstants.EMAIL_FIELD, WRONG_CREDENTIALS_MESSAGE);
        errors.put(UIConstants.PASSWORD_FIELD, WRONG_CREDENTIALS_MESSAGE);
        return errors;
    }

    // generates error response for not matching passwords.
    public static Map<String, String> generateConfirmPasswordError() {
        Map<String, String> errors = new HashMap<>();
        errors.put(UIConstants.CONFIRM_PASSWORD_FIELD, CONFIRM_PASSWORD_FIELD_MESSAGE);
        return errors;
    }

    // generates error response for not matching passwords.
    public static Map<String, String> generateRegistrationSuccessMessage() {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", REGISTRATION_SUCCESS_MESSAGE);
        return errors;
    }
}