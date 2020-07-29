import React, {useContext, useEffect, useState} from 'react';
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/listProjectsPage.css';
import '../../css/app.css';
import '../../css/loading-icon.css';
import {Helmet} from "react-helmet";
import SearchContext from "../contexts/SearchContext";
import {Link} from "react-router-dom";
import Button from "../components/forms/Button";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";
import {toast} from "react-toastify";
import AuthAPI from "../services/AuthAPI";
import ProjectsAPI from '../services/ProjectsAPI';



const ListProjectsPage = (props) => {

    const [projects, setProjects] = useState([]);
    const [archivedProjects, setArchivedProjects] = useState(false);
    const [loading, setLoading] = useState(true);
    const {searchValue} = useContext(SearchContext);

    const STATUS_CLASSES = {
        no_start: "info",
        in_progress: "warning",
        finished: "success",
        archived: "primary"
    };

    const STATUS_LABEL = {
        no_start: "Pas démarré",
        in_progress: "En cours",
        finished: "Fini",
        archived: "Archivé"
    };



    useEffect(() => {
        fetchProjects().then(r => "");
    }, []);

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

    const filteredArchivedProjects = projects.filter(
        archivedProjects
            ?
            p =>
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'archived' ||
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'no_start' ||
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'in_progress' ||
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'finished'
            :
            p =>
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'no_start' ||
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'in_progress' ||
                DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(p.dateFinReelle)) === 'finished'
    );  //TODO Trouver façon de refactoriser cette condition... C'est moche...


    const filteredProjects = filteredArchivedProjects.filter(
        p =>
            p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            STATUS_LABEL[DateAPI.determineStatus(p.dateDebut, DateAPI.verifyDateExist(projects.dateFinReelle))].toLowerCase().includes(searchValue.toLowerCase()) ||
            p.ville.toLowerCase().includes(searchValue.toLowerCase())
    );

    const onChangeArchivedShow = event => {
        setArchivedProjects(!archivedProjects);
        //TODO: Optimisation voir si on charge tout et on change l'affichage ou si l'on charge uniquement le nécessaire. Si chargement ou pas quand on affiche archivés...
    };


    return (
        <main className="container">
            <Helmet>
                <style>{'body { background-color: white; }'}</style>
            </Helmet>
            <div className="row">
                <h2 className="col-3">Liste des projets : </h2>
                <div className="offset-6">
                    <Button
                        onClick={onChangeArchivedShow}
                        text={archivedProjects ? "Cacher les projets archivés" : "Montrer les projets archivés"}
                        className="btn btn-secondary text-right"
                        type="button"
                    />
                </div>
            </div>

            <div className="card-group">

                {!loading && <>

                    {filteredProjects.length === 0 ?
                        <p className="mt-2 font-weight-bold font-italic">Désolé il n'y a pas de résultat pour votre
                            recherche...</p>
                        :
                        filteredProjects.map(project =>
                            <Link style={{textDecorationLine: "none", color: "black"}} to={"/project/" + project.id}
                                  key={project.id}>

                                <div className="card m-4" style={{width: '20rem', height: '26rem'}}>

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
                                            STATUS_CLASSES[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}>
                                        {STATUS_LABEL[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </>
                }

                {loading && <div id="loading-icon"> </div>}

            </div>
        </main>
    );
};

export default ListProjectsPage;
