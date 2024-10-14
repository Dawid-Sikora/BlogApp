import "./appCompCss/defaultAuthenticationCss.css"
import FormInput from "../uiComponents/FormInput";
import NavigatePrompt from "../uiComponents/NavigatePrompt";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from "./redux/actions/authActions";
import { resetRegister } from "./redux/actions/authActions";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { serverErrors, loading, isLogin, isRegisterSuccess } = useSelector((state) => state.auth);

    // reset register state while loading login component
    if(isRegisterSuccess){
        dispatch(resetRegister());
    }

    const formFields = [
        { icon: faEnvelope, name:'email', type: 'text', placeholder: 'Email', errorKey: 'email'},
        { icon: faLock, name:'password', type: 'password', placeholder: 'Password',  errorKey: 'password'},  
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
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formElements = e.target.elements;

        const formData = {
            email: formElements.email.value,
            password: formElements.password.value
        };

        //send data to redux
        dispatch(loginUser(formData));
    };

    //navigate to main after success login
    useEffect(() => {
        if (!loading && isLogin) {
            navigate('/main');
        }
    }, [loading, isLogin, navigate]);
    
    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className = "loginPanel">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {formFields.map(renderFormField)}
                <button type="submit" className={loading ? 'loading' : ''}>
                    {loading ? 'Submitting...' : 'Login'}
                </button> 
            </form>

            <NavigatePrompt 
                promptText="Are you new here?" 
                linkText="Create account" 
                onClick={navigateToRegister}
            />
        </div>
    )
}

export default Login;