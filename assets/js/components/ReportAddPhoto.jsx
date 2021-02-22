import React, { useEffect, useState } from "react";
import ImageUpload from "./forms/ImageUpload";
import MediaUploadAPI from "../services/MediaUploadAPI";
import PhotoAPI from "../services/PhotoAPI";
import Button from "../components/forms/Button";
import { toast } from "react-toastify";
import useIsMountedRef from "../components/UseIsMountedRef";

const ReportAddPhoto = ({ reportID, typePhoto }) => {
  const isMountedRef = useIsMountedRef();
  const [picture, setPicture] = useState([]);
  const [photos, setPhotos] = useState([]);

  const photo = {
    Report: "",
    link: "",
    type: typePhoto,
  };

  const fetchPhotos = async () => {
    try {
      const data = await PhotoAPI.findByReport(reportID);
      isMountedRef.current && setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

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
          fetchPhotos();
          toast.success("La photo a bien été ajouté");
        })
        .catch(function () {
          toast.error("Une erreur dans l'ajout de la photo");
        });
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await PhotoAPI.remove(id);
      fetchPhotos();
      toast.success("Photo supprimé");
    } catch (error) {}
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <form>
        <ImageUpload buttonText="Choisir l'image" onChange={onDrop} />
        <Button
          onClick={handleAddPhoto}
          className="btn btn-info offset-9 col-3 mb-4 mt-3"
          text="Valider les images"
        ></Button>
      </form>
      <div className="d-flex flex-wrap justify-content-around">
        {photos.map((photo) => (
          <React.Fragment key={photo.id}>
            {photo.type === typePhoto && (
              <div className="col-5 mb-2 ">
                <img className="col-12" src={photo.link} alt="" />
                <Button
                  type="button"
                  className="btn btn-danger mt-1 col-6 offset-3"
                  text="Supprimer"
                  onClick={() => handleDeletePhoto(photo.id)}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ReportAddPhoto;
