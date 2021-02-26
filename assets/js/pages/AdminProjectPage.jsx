import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "./../components/forms/Field";
import FieldTextArea from "./../components/forms/FieldTextArea";
import ProjectsAPI from "../services/ProjectsAPI";
import DateAPI from "../services/DateAPI";
import { toast } from "react-toastify";
import "../../css/loading-icon.css";
import ImageUpload from "../components/forms/ImageUpload";
import MediaUploadAPI from "../services/MediaUploadAPI";
import LotModal from "../components/modal/LotModal";
import EcheanceModal from "../components/modal/EcheanceModal";
import UsersInProjectSection from "../components/UsersInProjectSection";
import useIsMountedRef from "../components/UseIsMountedRef";
import Button from "../components/forms/Button";
import ImgComponent from "../components/images/ImgComponent";

const AdminProjectPage = ({ history, match, location, props }) => {
  const isMountedRef = useIsMountedRef();
  const { id = "new" } = match.params;

  const [project, setProject] = useState({
    photo: "../img/projects-img/projects-general-img/no-photo-project-img.jpg",
    adresse2: "",
    dateFinPrevues: [],
    reports: [],
    users: [],
    lots: [],
    companies: [],
  });

  const [error, setError] = useState({});
  const [loadingProject, setLoadingProject] = useState(true);
  const [edit, setEdit] = useState(false);
  const [picture, setPicture] = useState([]);
  const [showAddFinPrevue, setShowAddFinPrevue] = useState(false);

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      if (isMountedRef.current) {
        setProject(data);
        setLoadingProject(false);
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
      toast.error("Une erreur est survenue lors du chargement du projet.");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      isMountedRef.current && setEdit(true);
      fetchProject(id);
    }
  }, [id]);

  //----------------------------------- gestion de changement des input-------------------------------------------

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    if (
      name === "dateFinReelle" &&
      !DateAPI.dateIsAfterDebut(value, project.dateDebut)
    ) {
      setError({
        ...error,
        [name]:
          "La date de fin réélle doit être postérieure à la date de début!",
      });
    } else if (
      name === "dateFinPrevue" &&
      !DateAPI.dateIsAfter(value, project.dateDebut, project.dateFinPrevues)
    ) {
      setError({
        ...error,
        [name]: "La nouvelle date doit être postérieure aux autres",
      });
    } else {
      setError({ ...error, [name]: "" });
    }
    setProject({ ...project, [name]: value });
  };

  //-------------------------------------------GESTION SUBMIT FIN PREVUES-------------------------------------------

  const addFinPrevue = async () => {
    try {
      const dateToCreate = {
        date: project.dateFinPrevue,
        Project: "/api/projects/" + project.id,
      };
      await ProjectsAPI.addFinPrevueProject(dateToCreate).then((r) => {
        setProject({
          ...project,
          dateFinPrevues: [...project.dateFinPrevues, dateToCreate],
        });
      });
      toast.success("La date a bien été ajoutée.");
      setShowAddFinPrevue(false);
    } catch (e) {
      toast.error("Une erreur est survenue pendant l'ajout de la date.");
    }
  };

  //------------------------------------------- GESTION SUBMIT PROJET----------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", picture[0]);

    try {
      if (edit) {
        await MediaUploadAPI.upload(data)
          .then((response) => {
            project.photo = response.data.contentUrl;
          })
          .catch(function () {});
        delete project.users;
        delete project.dateFinPrevues;
        project.lots = project.lots.map((lot) => "/api/lots/" + lot.id);
        await ProjectsAPI.update(id, project);
        toast.success("Le projet a bien été modifié !");
        await fetchProject(id);
      } else {
        await ProjectsAPI.create(project).then((response) => {
          const projectID = response.data.id;
          MediaUploadAPI.upload(data)
            .then((response) => {
              project.photo = response.data.contentUrl;
              ProjectsAPI.update(projectID, project);
            })
            .catch(function () {
              console.log("FAILURE");
            });
          toast.success("Le projet a bien été crée !");
          history.replace("/admin/project/" + projectID);
        });
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
      const { violations } = e.response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setError(apiErrors);
      }
    }
  };

  //--------------------------------------------Gestion de l'image  ---------------------------------------------

  const onDrop = (picture) => {
    setPicture([...picture, picture]);
  };

  //--------------------------------------------Template  --------------------------------------------------------

  return (
    <>
      <main className="container">
        <h1>{edit ? "Modification du Projet" : "Création d'un Projet"}</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="d-flex flex-wrap justify-content-between">
            <fieldset className="border-fieldset col-xl-6 col-12">
              <legend>Information de localisation</legend>
              <Field
                name="name"
                label="Nom du projet"
                placeholder="Entrez le nom du projet"
                onChange={handleChange}
                value={project.name}
                error={error.name}
                required={true}
              />
              <FieldTextArea
                name="description"
                label="Decription du projet"
                rows="3"
                placeholder="Entrez la description du projet"
                onChange={handleChange}
                value={project.description}
                error={error.description}
                required={true}
              />
              <Field
                name="adresse1"
                label="Adresse 1"
                placeholder="Entrez le numéro et la rue"
                onChange={handleChange}
                value={project.adresse1}
                error={error.adresse1}
                required={true}
              />
              <Field
                name="adresse2"
                label="Adresse 2"
                placeholder="Entrez le complément d'adresse"
                onChange={handleChange}
                value={project.adresse2}
                error={error.adresse2}
              />
              <div className="d-flex flex-column flex-sm-row justify-content-between">
                <Field
                  name="codePostal"
                  label="Code Postal"
                  placeholder="Entrez le Code Postal"
                  onChange={handleChange}
                  value={project.codePostal}
                  error={error.codePostal}
                  required={true}
                />
                <Field
                  name="ville"
                  label="Ville"
                  placeholder="Entrez la ville"
                  onChange={handleChange}
                  value={project.ville}
                  error={error.ville}
                  required={true}
                />
              </div>
              {edit && (
                <>
                  <p>Photo</p>
                  <ImgComponent
                    className="col-12 col-sm-6"
                    src={project.photo}
                    alt="Image du projet"
                  />
                </>
              )}
              <ImageUpload singleImg={true} onChange={onDrop}></ImageUpload>
            </fieldset>
            {/* --------------------------------------------------------------------SECTION DATE */}
            <fieldset className="border-fieldset col-xl-5 col-12">
              <legend>Dates</legend>
              <Field
                name="dateDebut"
                label="Date de démarrage"
                type="date"
                onChange={handleChange}
                value={DateAPI.formatDateForm(project.dateDebut)}
                error={error.dateDebut}
                required={true}
              />
              {edit && (
                <>
                  {project.dateFinPrevues.length !== 0 ? (
                    <>
                      {project.dateFinPrevues.map((date, i) => (
                        <p key={i}>
                          {"Fin prévue " +
                            Number(i + 1) +
                            ": " +
                            DateAPI.formatDate(date.date)}
                        </p>
                      ))}
                    </>
                  ) : (
                    <p>{"Aucune date de fin prévue"}</p>
                  )}
                  {showAddFinPrevue ? (
                    <>
                      <Field
                        name="dateFinPrevue"
                        label="Nouvelle date de fin prévue"
                        type="date"
                        onChange={handleChange}
                        value={project.dateFinPrevue}
                        error={error.dateFinPrevue}
                      />
                      <Button
                        text="Ajouter la date"
                        type="button"
                        className="btn btn-success btn-sm ml-2 mb-3"
                        onClick={addFinPrevue}
                        disabled={error.dateFinPrevue || !project.dateFinPrevue}
                      />
                    </>
                  ) : (
                    <Button
                      text="Ajouter une date de fin prévue"
                      type="button"
                      className="btn btn-primary btn-sm ml-2 mb-3"
                      onClick={() => setShowAddFinPrevue(true)}
                    />
                  )}

                  <Field
                    name="dateFinReelle"
                    label="Date de fin réelle"
                    type="date"
                    onChange={handleChange}
                    value={DateAPI.formatDateForm(project.dateFinReelle)}
                    error={error.dateFinReelle}
                  />
                </>
              )}
            </fieldset>
            {/* --------------------------------------------------------------------SECTION CLIENT */}
            <fieldset className="border-fieldset col-xl-6 col-12 center">
              <legend>Informations Client</legend>
              <Field
                name="nomMOEX"
                label="MOEX"
                onChange={handleChange}
                value={project.nomMOEX}
                error={error.nomMOEX}
                required={true}
              />
              <Field
                name="nomOPC"
                label="OPC"
                onChange={handleChange}
                value={project.nomOPC}
                error={error.nomOPC}
                required={true}
              />
              <Field
                name="contactClient"
                label="Contact du Client"
                type="email"
                onChange={handleChange}
                value={project.contactClient}
                error={error.contactClient}
                required={true}
              />

              {edit && (
                <>
                  <LotModal
                    id={id}
                    project={project}
                    loadingProject={loadingProject}
                    fetchProject={fetchProject}
                  ></LotModal>
                  <EcheanceModal project={project}></EcheanceModal>
                </>
              )}
            </fieldset>
            {/* ------------------------------------------------------------------SECTION UTILISATEURS */}
            <UsersInProjectSection id={id} edit={edit} />
          </div>
          <div className="form-group d-flex justify-content-between align-items-center mt-2">
            <Link to="/admin/project" className="btn btn-danger">
              Retour aux projets
            </Link>
            {location.state && (
              <Button
                text={location.state}
                className="btn btn-info"
                type="button"
                onClick={() => history.goBack()}
              />
            )}
            <button type="submit" className="btn btn-success">
              Valider
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AdminProjectPage;
