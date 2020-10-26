import React, {useEffect, useState} from 'react';
import '../../../css/navbarLeft.css';
import {NavLink} from "react-router-dom";
import fakeData from "../fakeDataForDev/fakeData";


// TODO changer la class selected en fonction du clic


const NavbarLeft = ({match, selected}) => {

    const projects = fakeData.fakeListProjects();


    const params = match.params;
    const id = match.params;


    const [project, setProject] = useState(projects[id.id]); 
    //TODO truc bizarre obligé de passer par là pour récupérer le projet. A faire attention!

    //Récupération d'un projet
    const fetchProject = id => {
        //TODO récupérer le projet avec requête axios

        setProject(projects[id.id]); 
        //TODO Attention ca ne fonctionnait pas ici à vérifier plus tard avec axios


    };

    //Récupération du bon projet à chaque chargement du composant

    useEffect(() => {
        //TODO Normalement charge le projet à chaque fois que l'id change. Attention plus tard vérifier que tout fonctionne avec axios
        fetchProject(id);
    }, [id]);


    return (
        <div className="vertical-nav" id="sidebar">

            <p className="text-white font-weight-bold text-uppercase px-3 small pb-2 mt-5">{project.name}</p>

            <ul className="nav flex-column mb-0">

                <li className="nav-item mb-3">
                    <NavLink to={"/project/" + project.id + "/listReports"}
                             className={"nav-link font-italic"} >
                        &larr; Retour à la liste des rapports
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/effectifs"}
                             className={"nav-link font-italic" + (selected === 'effectifs' && " selected")}>
                        Effectifs
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/securite"}
                             className={"nav-link font-italic" + (selected === 'securite' && " selected")}>
                        Sécurité
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/propreteacces"}
                             className={"nav-link font-italic" + (selected === 'proprete' && " selected")}>
                        Propreté des Accès
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/propretepartiescommunes"}
                             className={"nav-link font-italic" + (selected === 'propetepartiecommune' && " selected")}>
                        Propreté des parties communes
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/echeances"}
                             className={"nav-link font-italic" + (selected === 'echeances' && " selected")}>
                        Echéances
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/validate"}
                             className={"nav-link font-italic" + (selected === 'validate' && " selected")}>
                        Validation et Envoi
                    </NavLink>
                </li>
            </ul>

        </div>
    );
};

export default NavbarLeft;