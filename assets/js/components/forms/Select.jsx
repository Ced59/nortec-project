import React from "react";

const Select = ({name, value, error = "", label, onChange ,children, required = false}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                onChange={onChange}
                name={name}
                id={name}
                value={value}
                className={"form-control" + (error && " is-invalid")}
                required={required}
            >
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
    );
};

export default Select;