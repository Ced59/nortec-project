import React from "react";
import ImgGallery from "./images/ImgGallery";

const ReportCard = ({category, children, comment, commentIntern, photos, typePhoto}) => {
  return (
    <>
      <h4 className="mb-3">{category} non conforme</h4>
      {children}
      <h6>Commentaire : </h6>
      <p className="ml-3">{comment}</p>
      <h6>Commentaire interne (non visible sur le rapport final): </h6>
      <p className="ml-3">{commentIntern}</p>
      <h6>Photos : </h6>
      <ImgGallery photos={photos} typePhoto={typePhoto}></ImgGallery>
    </>
  );
};

export default ReportCard;
