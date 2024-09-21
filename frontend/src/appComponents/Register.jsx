import React, { useState } from 'react';
import "./appCompCss/defaultAuthenticationCss.css"
import FormInput from "../uiComponents/FormInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    // errors messages store for each field
    const [errorsMessages, setErrorsMessages] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // if error should be visible
    const [ifShowErrors, setShowErrors] = useState({});

    const formFields = [
        { icon: faUser, name:'username', type: 'text', placeholder: 'Name',  errorKey: 'name'},
        { icon: faEnvelope, name:'email', type: 'text', placeholder: 'Email',  errorKey: 'email' },
        { icon: faLock, name:'password', type: 'password', placeholder: 'Password',  errorKey: 'password' },
        { icon: faLock, name:'confirmPassword', type: 'password', placeholder: 'Confirm Password',  errorKey: 'confirmPassword' },
    ];

    const renderFormField = (field, index) => (
        <div key={index} className="validationComponent">
            <div className="inputField">
                <FontAwesomeIcon className="iconStyle" icon={field.icon} />
                <FormInput name={field.name} type={field.type} placeholder={field.placeholder} />
            </div>
                <p className={`errorText ${ifShowErrors[field.errorKey] ? 'show' : ''}`}>
                    {errorsMessages[field.errorKey]}
                </p>
        </div>              
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // reset show errors before validation
        setShowErrors({});

        const formElements = e.target.elements;

        const formData = {
            name: formElements.username.value,
            email: formElements.email.value,
            password: formElements.password.value,
            confirmPassword: formElements.confirmPassword.value,
        };

        if (formData.password !== formData.confirmPassword) {
            setErrorsMessages((previousValues) => ({
                ...previousValues,
                confirmPassword: "Passwords do not match!"
            }));

            setShowErrors(() => ({
                confirmPassword: true
            }));
            return;
        }
    };

    return (
        <div className = "registerPanel">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {formFields.map(renderFormField)}
                <button type="submit">Submit</button> 
            </form>
        </div>
    )
}

export default Register;