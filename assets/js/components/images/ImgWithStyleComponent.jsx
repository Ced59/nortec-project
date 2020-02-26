import React from 'react';

const ImgWithStyleComponent = ({src, alt, className, style}) => {
    return (
        <img className={className}
             src={src}
             alt={alt}
             style={style}
        />

    );
};

export default ImgWithStyleComponent;