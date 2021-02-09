import React, { useState } from "react";
import ImageUpload from "./forms/ImageUpload";
import MediaUploadAPI from "../services/MediaUploadAPI";
import PhotoAPI from "../services/PhotoAPI";
import Button from "../components/forms/Button";



const ReportAddPhoto = ({reportID, typePhoto}) => {
  const [picture, setPicture] = useState([]);

  const [photo, setPhoto] = useState({
    Report: "",
    link: "",
    type: typePhoto,
  });

  const data = new FormData();

  const onDrop = (picture) => {
    setPicture([...picture, picture]);
    console.log(picture);
  };

  const handleAddPhoto = async (event) => {
    event.preventDefault();
    console.log(picture);
    for (let i = 0; i < picture.length - 1; i++) {
      data.append("file", picture[i]);

      await MediaUploadAPI.upload(data)
        .then((response) => {
          console.log(response.data);
          //console.log(report.id.toString());
          photo.Report = "/api/reports/" + reportID;
          photo.link = response.data.contentUrl;
          console.log(photo.Report);
          PhotoAPI.create(photo);
        })
        .catch(function () {
          console.log("FAILURE");
        });
    }
  };

  return (
    <form>
      <ImageUpload buttonText="Choisir l'image" onChange={onDrop} />
      <Button
        onClick={handleAddPhoto}
        className="btn btn-info offset-9 col-3 mb-4 mt-3"
        text="Valider les images"
      ></Button>
    </form>
  );
};

export default ReportAddPhoto;
