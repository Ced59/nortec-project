import React, { useEffect, useState } from "react";
import DateAPI from "../services/DateAPI";
import AuthAPI from "../services/AuthAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectsAPI from "../services/ProjectsAPI";
import {
  determineStatusClasses,
  determineStatusLabel,
} from "../components/ProjectStatus";
import "../../css/loading-icon.css";
import Pagination from "@material-ui/lab/Pagination";
import pagination_configs, {
  ADMIN_PROJECTS_PAGE_PAGINATION_ITEMS_PER_PAGE,
  ADMIN_USERS_PAGE_PAGINATION_ITEMS_PER_PAGE,
} from "../components/configs/pagination_configs";
const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userId] = useState(AuthAPI.getUserId());

  useEffect(() => {
    fetchProjects().then((r) => "");
  }, []);

  // --------------------------- Récupérer tout les Utilisateurs -----------------------------------------

  const fetchProjects = async () => {
    try {
      const data = await ProjectsAPI.findAll();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement de la liste des projets");
      console.log(error.response);
    }
  };

  // ----------------------------- Mise en place de la pagination ------------------------------------------

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const paginationConfig = pagination_configs.determinePaginationConfig(
    projects,
    ADMIN_PROJECTS_PAGE_PAGINATION_ITEMS_PER_PAGE,
    currentPage
  );

  // ----------------------------- Template ----------------------------------------------------------------

  return (
    <main className="container">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link className="btn btn-danger" type="button" to={"/admin"}>
          {" "}
          Retour{" "}
        </Link>
        <h2> Projets : </h2>

        <Link
          className="btn btn-primary"
          type="button"
          to={"/admin/project/new"}
        >
          {" "}
          Nouveau Projet{" "}
        </Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center">Numéro Projet</th>
            <th>Admin en Charge</th>
            <th className="text-center">Statut</th>
            <th>Nom Projet</th>
            <th className="text-center">Date début</th>
            <th>Date Fin prévue</th>
            <th className="text-center">Date fin réelle</th>
            <th />
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {paginationConfig.paginatedItems.map((project) => (
              <tr key={project.id}>
                <td className="text-center">{project.id}</td>
                <td>Florent</td>
                <td className="text-center">
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
                <td>{project.name}</td>
                <td className="text-center">
                  {DateAPI.formatDate(project.dateDebut)}
                </td>
                <td className="text-center">
                  {project.dateFinPrevues.map((dateFinPrevues) => (
                    <React.Fragment key={dateFinPrevues.id}>
                      {DateAPI.formatDate(dateFinPrevues.date)}<br/>
                    </React.Fragment>
                  ))}
                </td>
                <td className="text-center">
                  {DateAPI.verifyDateExist(project.dateFinReelle) === "" ? (
                    <span>Aucune</span>
                  ) : (
                    DateAPI.formatDate(project.dateFinReelle)
                  )}
                </td>

                <td>
                  <Link
                    className="btn btn-primary"
                    to={"/admin/project/" + project.id}
                  >
                    {" "}
                    Modifier{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {loading && <div id="loading-icon" className="mt-5 mb-5" />}

      <div className="mt-2 d-flex justify-content-center">
        <Pagination
          count={paginationConfig.pagesCount}
          color="primary"
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </main>
  );
};

export default AdminProjectsPage;
