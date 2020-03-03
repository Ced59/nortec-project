import React from 'react';

const FieldTextArea = ({ name, label, value, onChange, rows, placeholder = "", error = ""}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder || label}
                name={name}
                id={name}
                rows={rows}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default FieldTextArea;