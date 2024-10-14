import "./appCompCss/defaultAuthenticationCss.css"
import FormInput from "../uiComponents/FormInput";
import NavigatePrompt from "../uiComponents/NavigatePrompt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { registerUser } from './redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { serverErrors, loading, isRegisterSuccess } = useSelector((state) => state.auth);

    const formFields = [
        { icon: faUser, name:'username', type: 'text', placeholder: 'Name',  errorKey: 'username'},
        { icon: faEnvelope, name:'email', type: 'text', placeholder: 'Email',  errorKey: 'email' },
        { icon: faLock, name:'password', type: 'password', placeholder: 'Password',  errorKey: 'password' },
        { icon: faLock, name:'confirmPassword', type: 'password', placeholder: 'Confirm Password',  errorKey: 'confirmPassword' },
    ];

    const renderFormField = (field, index) => {
        const errorMessage = serverErrors?.[field.errorKey];
        return (
            <div key={index} className="validationComponent">
                <div className="inputField">
                    <FontAwesomeIcon className="iconStyle" icon={field.icon} />
                    <FormInput name={field.name} type={field.type} placeholder={field.placeholder} />
                </div>
                <p className={`errorText ${errorMessage ? 'show' : ''}`}>
                    {errorMessage}
                </p>
            </div>              
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formElements = e.target.elements;

        const formData = {
            username: formElements.username.value,
            email: formElements.email.value,
            password: formElements.password.value,
            confirmPassword: formElements.confirmPassword.value,
        };

        //send data to redux
        dispatch(registerUser(formData));
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    if (isRegisterSuccess) {
        return (
                <div className="successPanel">
                    <h1>Registration Successful!</h1>
                    <div className="successMessage">
                        <p>You have successfully registered your account.</p>
                    </div>
                    <NavigatePrompt 
                        promptText="" 
                        linkText="Login" 
                        onClick={navigateToLogin}
                    />
                </div>
        );
    }

    return (
        <div className = "registerPanel">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {formFields.map(renderFormField)}
                <button type="submit" className={loading ? 'loading' : ''}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button> 
            </form>
            <NavigatePrompt 
                promptText="Already have an account?" 
                linkText="Login" 
                onClick={navigateToLogin}
            />
        </div>
    )
}

export default Register;