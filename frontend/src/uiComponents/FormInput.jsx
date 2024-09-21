import "./uiCompCss/formInput.css"

const FormInput = (props) => {
    return (       
        <div>
            <input name={props.name} type={props.type} placeholder={props.placeholder}/>
        </div>
    )
}

export default FormInput;