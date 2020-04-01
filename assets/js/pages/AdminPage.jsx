import React, {useState} from 'react';
import Select from "../components/forms/Select";
import Button from "../components/forms/Button";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";

const AdminPage = () => {

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
        <h2 className="mb-4">Echéances : </h2>
        <table className="table table-hover">
            <thead>
            <tr>
                <th>Numéro Projet</th>
                <th>Admin en Charge</th>
                <th>Statut</th>
                <th>Nom Projet</th>
                <th>Date début</th>
                <th>Date Fin prévue</th>
                <th>Nouvelle date de fin</th>
                <th>Date fin réelle</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {projects.map(project =>
            <tr>
                <td>{project.id}</td>
                <td>Florent</td>
                <td><span className={"text-center pl-2 pr-2 pt-1 pb-1 badge badge-" +
                STATUS_CLASSES[DateAPI.determineStatus(project.date_debut, project.date_fin_reelle)]}>
                    {STATUS_LABEL[DateAPI.determineStatus(project.date_debut, project.date_fin_reelle)]}
                </span>
                </td>
                <td>{project.name}</td>
                <td>{project.date_debut}</td>
                <td>{project.date_fin_prevues === null ?
                    <span>Aucune</span>
                    :
                    project.date_fin_prevues.id === 0 }</td>
                <td></td>
                <td>{project.date_fin_reelle === "" ?
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

export default AdminPage;