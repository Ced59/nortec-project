import React from 'react';
import ImageUploader from "react-images-upload";

const ImageUpload = ({withIcon=true, buttonText, onChange}) => {
    return (
        <ImageUploader
            withIcon={withIcon}
            buttonText={buttonText}
            onChange={onChange}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            label="max :5MB, uniquement .jpg et .png"
        />
    );
};

export default ImageUpload;