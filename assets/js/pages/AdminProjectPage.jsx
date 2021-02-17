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

const AdminProjectPage = ({ history, match, props }) => {
  const isMountedRef = useIsMountedRef();
  const { id = "new" } = match.params;

  const [project, setProject] = useState({
    name: "",
    description: "",
    photo: "../img/projects-img/projects-general-img/no-photo-project-img.jpg",
    adresse1: "",
    adresse2: "",
    codePostal: "",
    dateDebut: "",
    nomMOEX: "",
    nomOPC: "",
    contactClient: "",
    ville: "",
    reports: [],
    users: [],
    lots: [],
    companies: [],
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    photo: "",
    adresse1: "",
    adresse2: "",
    codePostal: "",
    dateDebut: "",
    dateFinReelle: "",
    nomMOEX: "",
    nomOPC: "",
    contactClient: "",
    ville: "",
    reports: "",
    users: "",
    lots: "",
    companies: "",
  });

  const [loadingProject, setLoadingProject] = useState(true);
  const [edit, setEdit] = useState(false);
  const [picture, setPicture] = useState([]);

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      if (isMountedRef.current) {
        setProject(data);
        setLoadingProject(false);
      }
    } catch (error) {
      console.log(error.response);
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
    setProject({ ...project, [name]: value });
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
        project.users = project.users.map(
          (userInProject) => "/api/users/" + userInProject.id
        );
        project.dateFinPrevues = project.dateFinPrevues.map(
          (dateInProject) => "/api/project_date_fin_prevues/" + dateInProject.id
        );
        project.lots = project.lots.map((lot) => "/api/lots/" + lot.id);
        await ProjectsAPI.update(id, project);
        toast.success("Le projet a bien été modifié !");
        await fetchProject(id);
      } else {
        await ProjectsAPI.create(project).then((response) => {
          const projectID = response.data["@id"].split("/")[
            response.data["@id"].split("/").length - 1
          ];
          MediaUploadAPI.upload(data)
            .then((response) => {
              project.photo = response.data.contentUrl;
              ProjectsAPI.update(projectID, project);
            })
            .catch(function () {
              console.log("FAILURE");
            });
        });
        toast.success("Le projet a bien été crée !");
        history.replace("/admin/project");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setError(apiErrors);
      }
      console.log(response);
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
              <div className="d-flex justify-content-between">
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
              <ImageUpload singleImg={true} onChange={onDrop}></ImageUpload>
            </fieldset>
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
            </fieldset>
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
            {/* ---------------------------------------UTILISATEURS------------------------------------- */}
            <UsersInProjectSection id={id} edit={edit} />
          </div>
          <div className="form-group d-flex justify-content-between align-items-center mt-2">
            <Link to="/admin/project" className="btn btn-danger">
              Retour aux projets
            </Link>
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
