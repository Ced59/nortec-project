import React, {useState} from 'react';
import Button from "../components/forms/Button";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";
import { Link } from 'react-router-dom';

const AdminProjectPage = () => {

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

    const projects = fakeData.fakeListProjects();

    return <main className="container">
        <div className="row">
        <h2 className="mb-4"> Projets : </h2>
        <Link
            className='btn btn-primary m-auto'
            type='button'
            to={'/newProject'}
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
                <th></th>
            </tr>
            </thead>
            <tbody>
            {projects.map(project =>
            <tr>
                <td className="text-center">{project.id}</td>
                <td>Florent</td>
                <td className="text-center"><span className={"pl-2 pr-2 pt-1 pb-1 badge badge-" +
                STATUS_CLASSES[DateAPI.determineStatus(project.date_debut, project.date_fin_reelle)]}>
                    {STATUS_LABEL[DateAPI.determineStatus(project.date_debut, project.date_fin_reelle)]}
                </span>
                </td>
                <td>{project.name}</td>
                <td className="text-center">{project.date_debut}</td>
                <td className="text-center">{project.date_fin_prevues.length === 0 ?
                    <span>Aucune</span>
                    :
                    project.date_fin_prevues.id === 0 &&
                    <span> Hey </span>
                }</td>
                <td className="text-center"></td>
                <td className="text-center">{project.date_fin_reelle === "" ?
                    <span>Aucune</span>
                    :
                    project.date_fin_reelle}</td>

                <td>
                    <Button className="btn btn-primary" text="Modifier"/>
                </td>
            </tr>
            )
            }
            </tbody>
        </table>
    </main>

};

export default AdminProjectPage;