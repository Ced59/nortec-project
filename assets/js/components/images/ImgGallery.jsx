import React from "react";

const ImgGallery = ({photos, typePhoto,children}) => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {photos.map((photo) => (
        <React.Fragment key={photo.id}>
          {photo.type === typePhoto && (
            <div className="col-5 mb-2">
            <img id={photo.id} className="col-12" src={photo.link} alt="" />
            {children}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ImgGallery;
