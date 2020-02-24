import React from 'react';

const LogoCompany = ({src, alt, className, style}) => {
    return (
        <img className={className}
             src={src}
             alt={alt}
             style={style}
        />

    );
};

export default LogoCompany;