import React from 'react';

const Button = ({type="submit", className, text, onClick, name="", disabled=false}) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            name={name}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
