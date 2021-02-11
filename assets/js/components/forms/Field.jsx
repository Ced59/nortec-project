import React from 'react';

const Field = ({name, label, value = "", onChange, placeholder, className = "", type = "text", error = "", noLabel = false, readOnly = false, required = false}) => {
    return (
        <div className="form-group">
            {!noLabel &&
            <label htmlFor={name}>
                {label}
            </label>
            }
            <input
            readOnly={readOnly}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder || label}
                name={name}
                id={name}
                className={"form-control" + (error && " is-invalid") || className}
                required={required}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default Field;
