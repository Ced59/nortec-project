import React from 'react';

const Button = ({type, className, text, onClick, name=""}) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            name={name}
        >
            {text}
        </button>
    );
};

export default Button;