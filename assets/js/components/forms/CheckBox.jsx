import React from 'react';

const CheckBox = ({Label, onChange, classNameDiv, classNameLabel, htmlForLabel, idInput}) => {
    return (
        <div className={classNameDiv}>
            <input
                className="form-check-input"
                type="checkbox"
                id= {idInput}
                value="option1"
                onChange={onChange}
            />
            <label
                className= {classNameLabel}
                htmlFor= {htmlForLabel}
            >
                {Label}
            </label>
        </div>
    );
};

export default CheckBox;