import React from "react";

const ImgGallery = ({photos, typePhoto}) => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {photos.map((photo) => (
        <React.Fragment key={photo.id}>
          {photo.type === typePhoto && (
            <img className="col-5 mb-2" src={photo.link} alt="" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ImgGallery;
