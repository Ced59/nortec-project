import { Image, View } from "@react-pdf/renderer";
import React from "react";

const PdfPhotoGallery = ({ photos, viewStyle, imageStyle, typePhoto }) => {


  return (
    <View style={viewStyle}>
      {photos.map((photo) => (
        <React.Fragment key={photo.id}>
          {photo.type === typePhoto && (
            <Image style={imageStyle} src={photo.link} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default PdfPhotoGallery;
