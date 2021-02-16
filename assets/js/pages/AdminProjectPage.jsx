import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "./../components/forms/Field";
import FieldTextArea from "./../components/forms/FieldTextArea";
import UsersAPI from "../services/UsersAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import DateAPI from "../services/DateAPI";
import { toast } from "react-toastify";
import "../../css/loading-icon.css";
import ImageUpload from "../components/forms/ImageUpload";
import MediaUploadAPI from "../services/MediaUploadAPI";
import pagination_configs, {
  ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
} from "../components/configs/pagination_configs";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "react-bootstrap/Modal";
import LotModal from "../components/modal/LotModal";
import EcheanceModal from "../components/modal/EcheanceModal";
import SearchInput from "../components/forms/SearchInput";
import Button from "../components/forms/Button";

const AdminProjectPage = ({ history, match, props }) => {
  const { id = "new" } = match.params;

  const [project, setProject] = useState({
    name: "",
    description: "",
    photo: "../img/projects-img/projects-general-img/no-photo-project-img.jpg",
    adresse1: "",
    adresse2: "",
    codePostal: "",
    dateDebut: "",
    dateFinReelle: "1900-01-01",
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

  const [users, setUsers] = useState([]);

  const [loadingProject, setLoadingProject] = useState(true);

  const [currentPageAddUser, setCurrentPageAddUser] = useState(1);
  const [currentPageRemUser, setCurrentPageRemUser] = useState(1);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [edit, setEdit] = useState(false);

  const [picture, setPicture] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.findAll();
      setUsers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      setProject(data);
      setLoadingProject(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEdit(true);
      fetchProject(id).then((r) => "");
      fetchUsers().then((r) => "");
    } else {
      fetchUsers().then((r) => "");
    }
  }, [id]);

  const filtredAdmin = users.filter(
    (user) => UsersAPI.determineRole(user) === "Administrateur"
  );

  // ----------------------------- Mise en place de la pagination ------------------------------------------

  const handleChangePageAddUser = (event, page) => {
    setCurrentPageAddUser(page);
  };

  const handleChangePageRemUser = (event, page) => {
    setCurrentPageRemUser(page);
  };

  const filteredUsers = users.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.email.includes(searchValue.toLowerCase())
  );

  const usersInProject = filteredUsers.filter(
    (user) => user.project.indexOf("/api/projects/" + id) !== -1
  );
  const paginationConfigRemUser = pagination_configs.determinePaginationConfig(
    usersInProject,
    ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
    currentPageRemUser
  );

  const usersNotInProject = filteredUsers.filter(
    (User) => User.project.indexOf("/api/projects/" + id) === -1
  );
  const paginationConfigAddUser = pagination_configs.determinePaginationConfig(
    usersNotInProject,
    ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
    currentPageAddUser
  );

  //----------------------------------- gestion de changement des input-----------------------------------
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setProject({ ...project, [name]: value });
  };

  const handleAddUser = (user) => {
    const updatedUsers = [...project.users];
    updatedUsers.push(user);
    setProject({ ...project, users: updatedUsers });
  };

  const handleRemUser = (id) => {
    const updatedUsers = [...project.users];
    const index = updatedUsers.findIndex((user) => user.id === id);
    updatedUsers.splice(index, 1);
    setProject({ ...project, users: updatedUsers });
  };

  const handleShowUsersModal = () => {
    setShowUsersModal(!showUsersModal);
  };

  //------------------------------------------- gestion du submit----------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", picture[0]);

    if (!edit) {
      project.users = filtredAdmin.map((admin) => "/api/users/" + admin.id);
    }

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
        fetchUsers();
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
        {(edit && <h1>Modification du Projet</h1>) || (
          <h1>Création d'un Projet</h1>
        )}

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
            <fieldset className="border-fieldset col-xl-5 col-12">
              <legend>Choix des utilisateurs</legend>
              {(edit && (
                <div>
                  <button
                    type="button"
                    onClick={() => handleShowUsersModal()}
                    className="btn btn-primary btn-sm mb-4"
                  >
                    Ajouter des utilisateurs
                  </button>
                  <SearchInput
                    formClassName="form-inline"
                    InputClassName="form-control ml-auto"
                    placeholder="Rechercher un utilisateur"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  {paginationConfigRemUser.paginatedItems.filter(
                    (User) => UsersAPI.determineRole(User) == "Administrateur"
                  ).length !== 0 && (
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th colSpan="3" className="text-center border-0">
                            Administrateurs
                          </th>
                        </tr>
                        <tr>
                          <th className="border-0">Prénom</th>
                          <th className="border-0">Nom</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginationConfigRemUser.paginatedItems
                          .filter(
                            (User) =>
                              UsersAPI.determineRole(User) == "Administrateur"
                          )
                          .map((user) => (
                            <tr key={user.id}>
                              <td className="w-35">{user.firstName}</td>
                              <td className="w-35">{user.lastName}</td>
                              <td className="text-center">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleRemUser(user.id)}
                                >
                                  Retirer
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                  {paginationConfigRemUser.paginatedItems.filter(
                    (User) => UsersAPI.determineRole(User) == "Utilisateur"
                  ).length !== 0 && (
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th colSpan="3" className="text-center border-0">
                            Utilisateurs
                          </th>
                        </tr>
                        <tr>
                          <th className="border-0">Prénom</th>
                          <th className="border-0">Nom</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginationConfigRemUser.paginatedItems
                          .filter(
                            (User) =>
                              UsersAPI.determineRole(User) == "Utilisateur"
                          )
                          .map((user) => (
                            <tr key={user.id}>
                              <td className="w-35">{user.firstName}</td>
                              <td className="w-35">{user.lastName}</td>
                              <td className="text-center">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleRemUser(user.id)}
                                >
                                  Retirer
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )) || (
                <div>
                  Veuillez créer votre projet avant de faire la modification des
                  utilisateurs
                </div>
              )}
              {edit && (
                <div className="mt-2 d-flex justify-content-center">
                  <Pagination
                    count={paginationConfigRemUser.pagesCount}
                    color="primary"
                    page={currentPageRemUser}
                    onChange={handleChangePageRemUser}
                  />
                </div>
              )}
            </fieldset>
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

      {/* -------------------------------------------MODAL USERS----------------------------------------------- */}

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUsersModal}
        onHide={handleShowUsersModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liste des utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchInput
            formClassName="form-inline"
            InputClassName="form-control ml-auto"
            placeholder="Rechercher un utilisateur"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <form onSubmit={handleSubmit}>
            {paginationConfigAddUser.paginatedItems.filter(
              (User) => UsersAPI.determineRole(User) == "Administrateur"
            ).length !== 0 && (
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th colSpan="3" className="text-center border-0">
                      Administrateurs
                    </th>
                  </tr>
                  <tr>
                    <th className="border-0">Prénom</th>
                    <th className="border-0">Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationConfigAddUser.paginatedItems
                    .filter(
                      (User) => UsersAPI.determineRole(User) == "Administrateur"
                    )
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="w-35">{user.firstName}</td>
                        <td className="w-35">{user.lastName}</td>
                        <td className="text-center">
                          <Button
                            type="submit"
                            text="Ajouter"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddUser(user)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {paginationConfigAddUser.paginatedItems.filter(
              (User) => UsersAPI.determineRole(User) == "Utilisateur"
            ).length !== 0 && (
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th colSpan="3" className="text-center border-0">
                      Utilisateurs
                    </th>
                  </tr>
                  <tr>
                    <th className="border-0">Prénom</th>
                    <th className="border-0">Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationConfigAddUser.paginatedItems
                    .filter(
                      (User) => UsersAPI.determineRole(User) == "Utilisateur"
                    )
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="w-35">{user.firstName}</td>
                        <td className="w-35">{user.lastName}</td>
                        <td className="text-center">
                          <Button
                            type="button"
                            text="Ajouter"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddUser(user)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <div className="mt-2 d-flex justify-content-center">
              <Pagination
                count={paginationConfigAddUser.pagesCount}
                color="primary"
                page={currentPageAddUser}
                onChange={handleChangePageAddUser}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProjectPage;
