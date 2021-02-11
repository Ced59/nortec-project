import React from "react";
import ImgGallery from "./images/ImgGallery";

const ReportCard = (props) => {
  return (
    <>
      <h4 className="mb-3">{props.category} non conforme</h4>
      {props.children}
      <h6>Commentaire : </h6>
      <p className="ml-3">{props.comment}</p>
      <h6>Commentaire interne (non visible sur le rapport final): </h6>
      <p className="ml-3">{props.commentIntern}</p>
      <h6>Photos : </h6>
      <ImgGallery photos={props.photos} typePhoto={props.typePhoto}></ImgGallery>
    </>
  );
};

export default ReportCard;
