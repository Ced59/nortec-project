import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from './../components/forms/Field'
import FieldTextArea from './../components/forms/FieldTextArea'
import UsersAPI from '../services/UsersAPI';
import axios from 'axios';
import fakeData from "../components/fakeDataForDev/fakeData";

const ProjectPage = ({history, match}) => {

    const {id = "new"} = match.params;

    const [project, setProject] = useState({
        name: "Ici",
        description: "Non pas la",
        photo: "../img/projects-img/projects-general-img/0-project-img.jpg",
        adresse1: "ici non plus",
        adresse2: "Toujours pas",
        code_postal: "56666",
        date_debut: '2035-05-25',
        date_fin_reelle: "2046-05-25",
        nom_MOEX: "Vincent",
        nom_OPC: "Vincent",
        contact_client: "pasici@fake.com",
        ville : "Hallala",
        date_fin_prevues: "2045-05-25",
        users: []
    });
    
    const [error, setError] = useState({
        name: "",
        description: "",
        photo: "",
        adresse1: "",
        adresse2: "",
        code_postal: "",
        date_debut: "",
        date_fin_reelle: "",
        nom_MOEX: "",
        nom_OPC: "",
        contact_client: "",
        ville : "",
        date_fin_prevues: "",
        users: ""
    });
    
    const [users, setUsers] = useState([]);

    const [edit, setEdit] = useState(false);

    

    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchProject = id => {
        try {
            setProject(projects[id.id]); //axios.get("http://localhost:8000/api/projects/" + id).then(response => response.data);
            
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(()=> {
        if(id !== "new"){
            fetchProject(id);
        }
    }, [id])

    useEffect(() => {
        fetchUsers();
    }, [])

    const filtredAdmin = users.filter(
        user => UsersAPI.determineRole(user) === "Administrateur"
    );
//----------------------------------- gestion de changement des input-----------------------------------
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setProject({...project, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();

        project.users=filtredAdmin.map(admin => "/api/users/" + admin.id);
        console.log(project.users);

        try {
            const response = await axios.post("http://localhost:8000/api/projects", project)
            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
    };


    

    return ( <main className="container">
        <h1>Création d'un Projet</h1>

        <form onSubmit={handleSubmit} >
            <Field name="name" label="Nom du projet" placeholder="Entrez le nom du projet" onChange={handleChange} value={project.name} error={error.name} />
            <FieldTextArea name="description" label="Decription du projet" rows="3" placeholder="Entrez la description du projet" onChange={handleChange} value={project.description} error={error.description} />
            <Field name="adresse1" label="Adresse 1" placeholder="Entrez le numéro et la rue" onChange={handleChange} value={project.adresse1} error={error.adresse1} />
            <Field name="adresse2" label="Adresse 2" placeholder="Entrez le complément d'adresse" onChange={handleChange} value={project.adresse2} error={error.adresse2} />
            <Field name="code_postal" label="Code Postal" placeholder="Entrez le Code Postal" onChange={handleChange} value={project.code_postal} error={error.code_postal} />
            <Field name="ville" label="Ville" placeholder="Entrez le Code Postal" onChange={handleChange} value={project.ville} error={error.ville} />
            <Field name="date_debut" label="Date de démarrage" type="date" onChange={handleChange} value={project.date_debut} error={error.date_debut} />
            <Field name="date_fin_prevues" label="Date de fin prévue" type="date" onChange={handleChange} value={project.date_fin_prevues} error={error.date_fin_prevues} />
            <Field name="nom_MOEX" label="MOEX" onChange={handleChange} value={project.nom_MOEX} error={error.nom_MOEX} />
            <Field name="nom_OPC" label="OPC" onChange={handleChange} value={project.nom_OPC} error={error.nom_OPC} />
            <Field name="contact_client" label="Contact du Client" type="email" onChange={handleChange} value={project.contact_client} error={error.contact_client} />
            
            <div className="form-group d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-success">Valider</button>
                <Link to="/admin/project" className="btn btn-danger">Retour aux projets</Link>
            </div>
        </form>
    </main> );
}
 
export default ProjectPage;