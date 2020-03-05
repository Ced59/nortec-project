import React, {useContext, useEffect, useState} from 'react';
import '../../../css/navbarLeft.css';
import {NavLink} from "react-router-dom";
import fakeData from "../fakeDataForDev/fakeData";



// TODO changer la class selected en fonction du clic

const NavbarLeft = ({match, selected}) => {

    const projects = fakeData.fakeListProjects();


    const params = match.params;
    const id = match.params;


    const [project, setProject] = useState(projects[id.id]); //TODO truc bizarre obligé de passer par là pour récupérer le projet. A faire attention!

    //Récupération d'un projet
    const fetchProject = id => {
        //TODO récupérer le projet avec requête axios

        //console.log(projects[id.id]);

        setProject(projects[id.id]); //TODO Attention ca ne fonctionnait pas ici à vérifier plus tard avec axios


        //console.log(project);
    };

    //Récupération du bon projet à chaque chargement du composant

    useEffect(() => {
        //TODO Normalement charge le projet à chaque fois que l'id change. Attention plus tard vérifier que tout fonctionne avec axios
        fetchProject(id);
    }, [id]);



    return (
        <div className="vertical-nav" id="sidebar">

            <p className="text-white font-weight-bold text-uppercase px-3 small pb-4 mt-5">{project.name}</p>

            <ul className="nav flex-column mb-0">

                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/effectifs"} className={"nav-link font-italic" + (selected === 'effectifs' && " selected")}>
                        Effectifs
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/proprete"} className={"nav-link font-italic" + (selected === 'proprete' && " selected")}>
                        Propreté des Accès
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/securite"} className={"nav-link font-italic" + (selected === 'securite' && " selected")}>
                        Sécurité
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/installations"} className={"nav-link font-italic" + (selected === 'installations' && " selected")}>
                        Installations de chantiers
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/project/" + project.id + "/" + id.idReport + "/echeances"} className={"nav-link font-italic" + (selected === 'echeances' && " selected")}>
                        Echéances
                    </NavLink>
                </li>
            </ul>

        </div>
);
};

export default NavbarLeft;