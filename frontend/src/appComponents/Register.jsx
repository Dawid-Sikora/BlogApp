import "./appCompCss/defaultAuthenticationCss.css"
import FormInput from "../uiComponents/FormInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    return (
        <div className = "registerPanel">
            <h1>Register</h1>
            <form>
                <div className = "inputField">
                <FontAwesomeIcon className="icon-style" icon={faUser} />
                <FormInput type="text" placeholder="Name"/>
                </div>

                <div className = "inputField">
                <FontAwesomeIcon className="icon-style" icon={faEnvelope} />
                <FormInput type="text" placeholder="Email"/>
                </div>

                <div className = "inputField">
                <FontAwesomeIcon className="icon-style" icon={faLock} />
                <FormInput type="password" placeholder="Password"/>
                </div>

                <div className = "inputField">
                <FontAwesomeIcon className="icon-style" icon={faLock} />
                <FormInput type="password" placeholder="Confirm Password"/>
                </div>   

                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register;