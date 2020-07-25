import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Field from './../components/forms/Field'
import FieldTextArea from './../components/forms/FieldTextArea'
import UsersAPI from '../services/UsersAPI';
import ProjectsAPI from "../services/ProjectsAPI";
import DateAPI from '../services/DateAPI';
import {toast} from 'react-toastify';
import '../../css/loading-icon.css';

const ProjectPage = ({history, match}) => {

    const {id = "new"} = match.params;

    const [project, setProject] = useState({
        name: "",
        description: "",
        photo: "../img/projects-img/projects-general-img/3-project-img.jpg",
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
        users: []
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
        users: ""
    });

    const [users, setUsers] = useState([]);
    const [loadingProject, setLoadingProject] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const [edit, setEdit] = useState(false);


    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
            setLoadingUsers(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchProject = async id => {
        try {
            const data = await ProjectsAPI.find(id);
            setProject(data);
            setLoadingProject(false);
            console.log(data);


        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEdit(true);
            fetchProject(id).then(r => '');
            fetchUsers().then(r => '');
        }
        else
        {
            fetchUsers().then(r => '');
        }
    }, [id])


    const filtredAdmin = users.filter(
        user => UsersAPI.determineRole(user) === "Administrateur"
    );
//----------------------------------- gestion de changement des input-----------------------------------
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setProject({...project, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        project.users = filtredAdmin.map(admin => "/api/users/" + admin.id);

        try {
            if (edit) {
                console.log(project);
                await ProjectsAPI.update(id, project);
                toast.success("Le projet a bien été modifié !");
            } else {
                await ProjectsAPI.create(project);
                toast.success("Le projet a bien été crée !");
                history.replace("/admin/project");

            }

        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });

                setError(apiErrors);
            }
            console.log(response);
        }
    };


    return <main className="container">
        {edit && <h1>Modification du Projet</h1> || <h1>Création d'un Projet</h1>}

        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap justify-content-between">
                <fieldset className="border-fieldset col-6">
                    <legend>Information de localisation</legend>
                    <Field name="name" label="Nom du projet" placeholder="Entrez le nom du projet"
                           onChange={handleChange}
                           value={project.name} error={error.name}/>
                    <FieldTextArea name="description" label="Decription du projet" rows="3"
                                   placeholder="Entrez la description du projet" onChange={handleChange}
                                   value={project.description} error={error.description}/>
                    <Field name="adresse1" label="Adresse 1" placeholder="Entrez le numéro et la rue"
                           onChange={handleChange} value={project.adresse1} error={error.adresse1}/>
                    <Field name="adresse2" label="Adresse 2" placeholder="Entrez le complément d'adresse"
                           onChange={handleChange} value={project.adresse2} error={error.adresse2}/>
                    <Field name="codePostal" label="Code Postal" placeholder="Entrez le Code Postal"
                           onChange={handleChange}
                           value={project.codePostal} error={error.codePostal}/>
                    <Field name="ville" label="Ville" placeholder="Entrez la ville" onChange={handleChange}
                           value={project.ville} error={error.ville}/>
                </fieldset>
                <fieldset className="border-fieldset col-5">
                    <legend>Dates</legend>
                    <Field name="dateDebut" label="Date de démarrage" type="date" onChange={handleChange}
                           value={DateAPI.formatDateForm(project.dateDebut)} error={error.dateDebut}/>
                    {/* <Field name="dateFinPrevues" label="Date de fin prévue" type="date" onChange={handleChange}
                        value={project.dateFinPrevues} error={error.date_fin_prevues}/> */}
                </fieldset>
                <fieldset className="border-fieldset col-6 center">
                    <legend>Informations Client</legend>
                    <Field name="nomMOEX" label="MOEX" onChange={handleChange} value={project.nomMOEX}
                           error={error.nomMOEX}/>
                    <Field name="nomOPC" label="OPC" onChange={handleChange} value={project.nomOPC}
                           error={error.nomOPC}/>
                    <Field name="contactClient" label="Contact du Client" type="email" onChange={handleChange}
                           value={project.contactClient} error={error.contactClient}/>
                </fieldset>
                <fieldset className="border-fieldset col-5">
                    <legend>Choix des utilisateurs</legend>
                    <table className="table table-hover table-striped">
                        <thead>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Role</th>
                        <th></th>
                        </thead>
                        <tbody>
                        {project.users.map(user =>
                            <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{UsersAPI.determineRole(user)}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm">Retirer l'affectation</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {!loadingUsers &&
                    <select name="users" onChange={handleChange}>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                    }
                    {loadingUsers &&
                        <div id="loading-icon"></div>
                    }
                </fieldset>
            </div>
            <div className="form-group d-flex justify-content-between align-items-center mt-2">
                <button type="submit" className="btn btn-success">Valider</button>
                <Link to="/admin/project" className="btn btn-danger">Retour aux projets</Link>
            </div>
        </form>
    </main>

};

export default ProjectPage;
