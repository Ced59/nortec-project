import React from 'react';
import CheckBox from "./CheckBox";

const CheckBoxInLine = ({Label, onChange}) => {
    return (

        <CheckBox
            Label={Label}
            onChange={onChange}
            classNameDiv="form-check form-check-inline"
            classNameLabel="form-check-label"
            htmlForLabel="inlineCheckbox1"
            idInput="inlineCheckbox1"
        />

    );
};

export default CheckBoxInLine;