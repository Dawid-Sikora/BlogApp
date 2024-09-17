import "./appCompCss/defaultAuthenticationCss.css"
import FormInput from "../uiComponents/FormInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

    const formFields = [
        { icon: faUser, type: 'text', placeholder: 'Name' },
        { icon: faEnvelope, type: 'text', placeholder: 'Email' },
        { icon: faLock, type: 'password', placeholder: 'Password' },
        { icon: faLock, type: 'password', placeholder: 'Confirm Password' },
    ];

    const renderFormField = (field, index) => (
        <div key={index} className="inputField">
            <FontAwesomeIcon className="iconStyle" icon={field.icon} />
            <FormInput type={field.type} placeholder={field.placeholder} />
        </div>
    );

    return (
        <div className = "registerPanel">
            <h1>Register</h1>
            <form>
                {formFields.map(renderFormField)}
                <button>Submit</button> 
            </form>
        </div>
    )
}

export default Register;