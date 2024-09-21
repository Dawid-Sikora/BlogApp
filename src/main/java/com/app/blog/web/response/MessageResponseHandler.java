package com.app.blog.web.response;

import com.app.blog.web.request.UIConstants;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

public class MessageResponseHandler {

    private static final String EMAIL_IN_USE_MESSAGE = "Email is already in use!";

    public static final String REGISTRATION_SUCCESS_MESSAGE = "User registered successfully!";

    // generates error response based on fields validation.
    public static StringBuilder generateFieldValidationError(BindingResult bindingResult) {
        StringBuilder errorMessage = new StringBuilder();
        bindingResult.getFieldErrors().forEach(error ->
                errorMessage.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("; ")
        );
        return errorMessage;
    }

    // generates error response for email already in use case.
    public static StringBuilder generateEmailInUseError() {
        StringBuilder errorMessage = new StringBuilder();
        errorMessage.append(UIConstants.EMAIL_FIELD).append(": ").append(EMAIL_IN_USE_MESSAGE).append("; ");
        return errorMessage;
    }

}