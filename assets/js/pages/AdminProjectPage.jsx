import React, {useState, useEffect} from 'react';
import Button from "../components/forms/Button";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProjectsAPI from '../services/ProjectsAPI';
import '../../css/loading-icon.css';

const AdminProjectPage = () => {

    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

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
    }

// ----------------------------- Mise en place de la pagination ------------------------------------------

    const handleChangePage = page => {
        setCurrentPage(page);
    }

    const itemsPerPage = 6;
    const pagesCount = Math.ceil(projects.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedProjects = projects.slice(start, start + itemsPerPage)

    return <main className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2> Projets : </h2>
        <Link
            className='btn btn-primary'
            type='button'
            to={'/admin/project/new'}
        > Nouveau Projet </Link>
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
                <th>Nouvelle date de fin</th>
                <th className="text-center">Date fin réelle</th>
                <th/>
            </tr>
            </thead>
            {!loading &&
            <tbody>
            {paginatedProjects.map(project =>
                <tr key={project.id}>
                    <td className="text-center">{project.id}</td>
                    <td>Florent</td>
                    <td className="text-center"><span className={"pl-2 pr-2 pt-1 pb-1 badge badge-" +
                    STATUS_CLASSES[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}>
                        {STATUS_LABEL[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}
                    </span>
                    </td>
                    <td>{project.name}</td>
                    <td className="text-center">{DateAPI.formatDate(project.dateDebut)}</td>
                    {/* <td className="text-center">{project.date_fin_prevues.length === 0 ?
                        <span>Aucune</span>
                        :
                        project.date_fin_prevues.id === 0 &&
                        <span> Hey </span>
                    }</td> */}
                    <td className="text-center"/>
                    <td className="text-center"/>
                    <td className="text-center">{DateAPI.verifyDateExist(project.dateFinReelle) === "" ?
                        <span>Aucune</span>
                        :
                        DateAPI.formatDate(project.dateFinReelle)}</td>

                    <td>
                        <Link className="btn btn-primary" to={'/admin/project/' + project.id} > Modifier </Link>
                    </td>
                </tr>)
            }   
            </tbody>
        }
        </table>
        {loading &&
            <div id="loading-icon" className="mt-5 mb-5"/>
            }
        <div className="mt-2">
                <ul className="pagination pagination-sm justify-content-center">
                    <li className={"page-item" + (currentPage === 1 && " disabled")}>
                        <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>&laquo;</button>
                    </li>
                    {pages.map(page =>
                        <li key={page} className={"page-item" + (currentPage === page && " active")}>
                            <button className="page-link" onClick={() => handleChangePage(page)}>{page}</button>
                        </li>
                    )}

                    <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                        <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </div>
    </main>

};

export default AdminProjectPage;
