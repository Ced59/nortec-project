import React from 'react';

const FieldTextArea = ({ id, name, label, value, onChange, rows, placeholder = "", error = "", readOnly = false, required = false}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label}
            </label>
            <textarea
                value={value}
                readOnly= {readOnly}
                onChange={onChange}
                placeholder={placeholder || label}
                name={name}
                id={id}
                rows={rows}
                className={"form-control" + (error && " is-invalid")}
                required={required}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default FieldTextArea;