import React, { useEffect, useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UsersAPI from "../services/UsersAPI";
import "../../css/fieldset.css";
import "../../css/loading-icon.css";
import Button from "../components/forms/Button";
import {
  determineStatusClasses,
  determineStatusLabel,
} from "../components/ProjectStatus";
import DateAPI from "../services/DateAPI";
import Pagination from "@material-ui/lab/Pagination";
import pagination_configs, {
  ADMIN_USER_PAGE_PAGINATION_ITEMS_PER_PAGE,
} from "../components/configs/pagination_configs";
import useIsMountedRef from "../components/UseIsMountedRef";
import ChangeUserRoleModal from "../components/modal/ChangeUserRoleModal";
import ChangeUserStatusModal from "../components/modal/ChangeUserStatusModal";

const AdminUserPage = ({ history, match, props }) => {
  //------------------------------- Récupération de l'id si il y en a un --------------------------------
  const isMountedRef = useIsMountedRef();
  const { id = "new" } = match.params;
  const [projects, setProjects] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    role: ["ROLE_USER"],
    active: true,
  });

  const [error, setError] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });

  //---------------------------------------- Récupérer un Utilisateur ------------------------------------

  const fetchUser = async () => {
    try {
      const result = await UsersAPI.find(id);
      if (isMountedRef.current) {
        setUser(result);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Le chargement de l'utilisateur a rencontré un problème !");
      setLoading(false);
      history.replace("/admin/user/" + id);
    }
  };

  //---------------------------------------- Récupérer les projets de l'utilisateur ------------------------------------

  const fetchProjects = async () => {
    try {
      let result = await UsersAPI.getProjects(id);
      if (isMountedRef.current) {
        setProjects(result);
        setLoadingProjects(false);
      }
    } catch (error) {
      toast.error("Le chargement des projets a rencontré un problème !");
      setLoadingProjects(false);
      history.replace("/admin/user/" + id);
    }
  };

  //--------------------------- Chargement de l'utilisateur au changement d'identifiant ------------------

  useEffect(() => {
    if (id !== "new") {
      setEdit(true);
      fetchUser();
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [id]);

  //----------------------------------- gestion de changement des input-----------------------------------
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // ---------------------------------------GESTION USERS PROJECTS----------------------------------------

  const handleDeleteUserProject = async (idProject) => {
    if (edit) {
      const newUserProjects = user.project.filter(
        (p) => p !== `/api/projects/${idProject}`
      );
      setUser({ ...user, project: newUserProjects });
      const userProjects = { project: newUserProjects };
      try {
        await UsersAPI.update(id, userProjects);
        toast.success("Liste des projects de l'utilisateur mise à jour");
        setLoadingProjects(true);
        fetchProjects();
      } catch (error) {
        console.log(error.response);
        toast.error("Une erreur est survenue");
      }
    }
  };

  //------------------------------------ Gestion de soumission du form -----------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (edit) {
        await UsersAPI.update(id, user);
        toast.success("L'utilisateur a bien été modifié !");
        history.replace("/admin/userslist");
      } else {
        await UsersAPI.create(user);
        toast.success("L'utilisateur a bien été créé !");
        history.replace("/admin/userslist");
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
    }
  };

  // ----------------------------- Mise en place de la pagination ------------------------------------------

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const paginationConfigCalc = () => {
    if (!loadingProjects) {
      return pagination_configs.determinePaginationConfig(
        projects,
        ADMIN_USER_PAGE_PAGINATION_ITEMS_PER_PAGE,
        currentPage
      );
    } else {
      return [];
    }
  };

  const paginationConfig = paginationConfigCalc();

  // ----------------------------- Template -----------------------------------------------------------------

  return (
    <>
      <main className="container px-0">
        {(!edit && <h1>Création d'un Utilisateur</h1>) || (
          <h1>Modification de l'utilisateur</h1>
        )}

        <div className="col-12 d-flex flex-lg-row flex-column p-0">
          <form onSubmit={handleSubmit} className="col-12 col-lg-6 mt-3">
            <fieldset className="border-fieldset">
              <legend>Informations générales</legend>
              {!loading ? (
                <>
                  <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du nouvel utilisateur"
                    value={user.lastName}
                    onChange={handleChange}
                    error={error.lastName}
                  />
                  <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du nouvel utilisateur"
                    value={user.firstName}
                    onChange={handleChange}
                    error={error.firstName}
                  />
                  <Field
                    name="email"
                    label="Email"
                    placeholder="email du nouvel utilisateur"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    error={error.email}
                  />
                  <Field
                    name="password"
                    label="Mot de passe"
                    placeholder="mot de passe du nouvel utilisateur"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    error={error.password}
                  />

                  <div className="form-group text-right mt-4">
                    <Button text="Valider" className="btn btn-primary" />
                  </div>
                </>
              ) : (
                <div id="loading-icon" />
              )}
            </fieldset>
          </form>

          <div className="col-12 col-lg-6 mt-3">
            <form className="col-12 p-0">
              <fieldset className="border-fieldset">
                <legend>Rôle de l'utilisateur</legend>

                <div className="row">
                  {edit ? (
                    <>
                      {!loading ? (
                        <>
                          <p className="col-8">
                            {UsersAPI.determineRole(user)}
                          </p>
                          <ChangeUserRoleModal
                            user={user}
                            fetchUser={fetchUser}
                          />
                        </>
                      ) : (
                        <div id="loading-icon" />
                      )}
                    </>
                  ) : (
                    <p className="col-12">
                      Le compte aura les droits d'utilisateur par défaut
                    </p>
                  )}
                </div>
              </fieldset>
            </form>

            <div className="col-12 p-0 mt-4">
              <fieldset className="border-fieldset">
                <legend>Utilisateur actif</legend>
                <div className="row">
                  {edit ? (
                    <>
                      {!loading ? (
                        <>
                          <p className="col-8">
                            {user.active
                              ? "Le compte de l'utilisateur est bien activé"
                              : "Le compte de l'utilisateur n'est pas activé"}
                          </p>
                          <ChangeUserStatusModal
                            user={user}
                            fetchUser={fetchUser}
                          />
                        </>
                      ) : (
                        <div id="loading-icon" />
                      )}
                    </>
                  ) : (
                    <p className="col-12">
                      Le compte de l'utilisateur sera activé par défaut
                    </p>
                  )}
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {edit && (
          <div className="col-12">
            <fieldset className="border-fieldset mt-3">
              <legend>
                Liste des projets affectés à {user.firstName} {user.lastName}
              </legend>
              {!loadingProjects ? (
                <>
                  {edit && (
                    <>
                      {projects.length === 0 ? (
                        <p className="text-center">
                          L'utilisateur n'est affecté à aucun projet
                        </p>
                      ) : (
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th className="p-2">Nom</th>
                              <th className="p-2">Ville</th>
                              <th className="p-2 text-center">Date début</th>
                              <th className="p-2 text-center">Statut</th>
                              <th />
                            </tr>
                          </thead>

                          <tbody>
                            {projects.map((project) => (
                              <tr key={project.id}>
                                <td className="p-2">{project.name}</td>
                                <td className="p-2">{project.ville}</td>
                                <td className="p-2 text-center">
                                  {DateAPI.formatDate(project.dateDebut)}
                                </td>
                                <td className="p-2 text-center">
                                  <span
                                    className={
                                      "pl-2 pr-2 pt-1 pb-1 badge badge-" +
                                      determineStatusClasses(
                                        project.dateDebut,
                                        project.dateFinReelle
                                      )
                                    }
                                  >
                                    {determineStatusLabel(
                                      project.dateDebut,
                                      project.dateFinReelle
                                    )}
                                  </span>
                                </td>
                                <td className="p-2 text-center">
                                  <Button
                                    text="Retirer le projet"
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleDeleteUserProject(project.id)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                      <div className="mt-2 d-flex justify-content-center">
                        <Pagination
                          count={paginationConfig.pagesCount}
                          color="primary"
                          page={currentPage}
                          onChange={handleChangePage}
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div id="loading-icon" />
              )}
            </fieldset>
          </div>
        )}
        <div className="form-group mt-4">
          <Link to="/admin/userslist" className="btn btn-danger">
            Retour à la liste des utilisateurs
          </Link>
        </div>
      </main>
    </>
  );
};

export default AdminUserPage;
