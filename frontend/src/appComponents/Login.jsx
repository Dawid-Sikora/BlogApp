import "./appCompCss/defaultAuthenticationCss.css"
import FormInput from "../uiComponents/FormInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const formFields = [
        { icon: faEnvelope, type: 'text', placeholder: 'Email' },
        { icon: faLock, type: 'password', placeholder: 'Password' },  
    ];

    const renderFormField = (field, index) => (
        <div key={index} className="inputField">
            <FontAwesomeIcon className="iconStyle" icon={field.icon} />
            <FormInput type={field.type} placeholder={field.placeholder} />
        </div>
    );

    return (
        <div className = "loginPanel">
            <h1>Login</h1>
            <form>
                {formFields.map(renderFormField)}
                <button>Login</button> 
            </form>
        </div>
    )
}

export default Login;