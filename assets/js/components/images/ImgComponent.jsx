import React from 'react';

const ImgComponent = ({src, alt, className}) => {
    return (
        <img className={className}
             src={src}
             alt={alt}
        />
    );
};

export default ImgComponent;