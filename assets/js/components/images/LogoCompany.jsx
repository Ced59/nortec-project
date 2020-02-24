import React from 'react';

const LogoCompany = ({src, alt, className}) => {
    return (
        <img className={className}
             src={src}
             alt={alt}
        />


    );
};

export default LogoCompany;