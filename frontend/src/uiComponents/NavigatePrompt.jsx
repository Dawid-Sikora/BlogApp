import React from 'react';

const NavigatePrompt = ({ promptText, linkText, onClick }) => {
    return (
        <p className="prompt">
            {promptText}
            <span>&nbsp;</span>
            <span 
                className="link" 
                onClick={onClick}
            >
                {linkText}
            </span>.
        </p>
    );
};

export default NavigatePrompt;