import React from "react";

const SearchInput = ({
  formClassName,
  InputClassName,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className={formClassName}>
      <input
        className={InputClassName}
        type="text"
        placeholder={placeholder}
        aria-label="Search"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
