import React from 'react';

const Field = ({name, label, value = "", onChange = "", placeholder, className = "", type = "text", error = "", noLabel = false}) => {
    return (
        <div className="form-group">
            {!noLabel &&
            <label htmlFor={name}>
                {label}
            </label>
            }
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder || label}
                name={name}
                id={name}
                className={"form-control" + (error && " is-invalid") || className}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default Field;
