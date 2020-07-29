import React from 'react';
import ImageUploader from "react-images-upload";

const ImageUpload = ({withIcon=true, onChange, singleImg, buttonType}) => {
    return (
        <ImageUploader
            withIcon={withIcon}
            withPreview={true}
            buttonText='Choisissez une image'
            onChange={onChange}
            imgExtension={['.jpg', '.gif', '.png']}
            maxFileSize={5242880}
            fileTypeError="Le type de fichier n'est pas supporté"
            fileSizeError="Le fichier sélectionné est trop volumineux"
            singleImage={singleImg}
            label="Maximum 5MB"
            name="picture"
            buttonType={buttonType}
        />
    );
};

export default ImageUpload;
