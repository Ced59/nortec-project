import React, { useContext, useEffect, useState } from "react";
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/listProjectsPage.css';
import '../../css/app.css';
import '../../css/loading-icon.css';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import Button from "../components/forms/Button";
import DateAPI from "../services/DateAPI";
import {determineStatusClasses, determineStatusLabel} from "../components/ProjectStatus";
import {toast} from "react-toastify";
import ProjectsAPI from "../services/ProjectsAPI";
import Pagination from "@material-ui/lab/Pagination";
import pagination_configs, {
  LIST_PROJECTS_PAGE_PAGINATION_ITEMS_PER_PAGE,
} from "../components/configs/pagination_configs";

const ListProjectsPage = () => {

    const [projects, setProjects] = useState([]);
    const [archivedProjects, setArchivedProjects] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // --------------------------- Récupérer tous les projets de l'utilisateur -----------------------------------------
    
    const fetchProjects = async () => {
        try {
            const data = await ProjectsAPI.findAll();
            setProjects(data);
            setLoading(false);
        } catch (error) {
            toast.error("Erreur lors du chargement de la liste des projets");
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchProjects().then(r => "");
    }, []);

    // ----------------------------- FILTRAGE ARCHIVES ----------------------------------------

   const filteredArchivedProjects = projects.filter(
        p =>
            DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'no_start' ||
            DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'in_progress' ||
            DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'finished' ||
            (archivedProjects && (
            DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'archived'
            ))
    );

    // ----------------------------- FILTRAGE RECHERCHE ----------------------------------------

    const filteredProjects = filteredArchivedProjects.filter(
        p =>
            p.name.toLowerCase().includes(searchValue.toLowerCase()) || //filtre par nom
            determineStatusLabel(p.dateDebut, projects.dateFinReelle).toLowerCase().includes(searchValue.toLowerCase()) || //filtre par statut
            p.ville.toLowerCase().includes(searchValue.toLowerCase()) //filtre par ville
    );

    // ----------------------------- Mise en place de la pagination ------------------------------------------

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    }

    const paginationConfig = pagination_configs.determinePaginationConfig(filteredProjects, LIST_PROJECTS_PAGE_PAGINATION_ITEMS_PER_PAGE, currentPage);

    // ----------------------------- Template ------------------------------------------

    return (
        <main className="container">
            <Helmet>
                <style>{'body { background-color: white; }'}</style>
            </Helmet>
            <div className="row justify-content-between mb-2">
                <h2>Liste des projets : </h2>
                <div className="d-flex">
                    <form className="form-inline mr-2">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Rechercher un projet"
                            aria-label="Search"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                    </form>
                    <Button
                        onClick={()=>setArchivedProjects(!archivedProjects)}
                        text={archivedProjects ? "Cacher les projets archivés" : "Montrer les projets archivés"}
                        className="btn btn-secondary text-right"
                        type="button"
                        page= {currentPage - 1}
                    />
                </div>
            </div>

            <div className="card-group">

                {!loading && <>

                    {paginationConfig.paginatedItems.length === 0 ?
                        <p className="mt-2 font-weight-bold font-italic">Désolé il n'y a pas de résultat pour votre
                            recherche...</p>
                        :
                        paginationConfig.paginatedItems.map(project =>
                            
                            <div className="mx-auto" key={project.id}>

                                <Link className="card mb-4" to={'/project/' + project.id} style={{textDecorationLine: "none", color: "black", width: '20rem', height: '26rem'}} >

                                    <h5 className="card-title p-2">{project.name}</h5>

                                    <ImgWithStyleComponent
                                        className="card-img-top"
                                        src={project.photo}
                                        alt={project.name}
                                        style={{height: "10rem"}}
                                    />
                                    <div className="card-body">
                                        <p className="card-text text-right mb-3">{project.ville}</p>
                                        <p className="card-text mb-1">Description:</p>
                                        <p className="font-weight-light font-italic card-text">{project.description}</p>

                                    </div>
                                    <div className="card-footer pb-0 text-right">
                                        <p><span
                                            className={"pl-2 pr-2 pt-1 pb-1 badge badge-" +
                                            determineStatusClasses(project.dateDebut, project.dateFinReelle)}>
                                        {determineStatusLabel(project.dateDebut, project.dateFinReelle)}</span>
                                        </p>
                                    </div>

                                </Link>

                            </div>
                        )


                    }
                </>
                }



                {loading && <div id="loading-icon"> </div>}

            </div>
            <div className="row mt-2 mb-4 d-flex justify-content-center">
                <Pagination count={paginationConfig.pagesCount}
                            color="primary"
                            page={currentPage}
                            onChange={handleChangePage}
                />
            </div>
        </main>
    );
};

export default ListProjectsPage;
