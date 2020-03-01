import React, {useEffect, useState} from 'react';
import '../../../css/navbarLeft.css';
import {Link} from "react-router-dom";
import fakeData from "../fakeDataForDev/fakeData";

// TODO faire un map sur le tableau de données quand il y aura un back
// TODO changer la class selected en fonction du clic

const NavbarLeft = ({match}) => {

    const projects = fakeData.fakeListProjects();

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
        //console.log(project);
    }, [id]);



    return (
        <div className="vertical-nav" id="sidebar">

            <p className="text-white font-weight-bold text-uppercase px-3 small pb-4 mt-5">Liste des projets</p>

            <ul className="nav flex-column mb-0">

                <li className="nav-item">
                    <Link to={"/project/" + project.id + "/newReport/effectifs"} className="nav-link font-italic selected">
                        Effectifs
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/project/" + project.id + "/newReport/proprete"} className="nav-link font-italic">
                        Propreté des Accès
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/project/" + project.id + "/newReport/securite"} className="nav-link font-italic">
                        Sécurité
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/project/" + project.id + "/newReport/installations"} className="nav-link font-italic">
                        Installations de chantiers
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/project/" + project.id + "/newReport/echeances"} className="nav-link font-italic">
                        Echéances
                    </Link>
                </li>
            </ul>

        </div>
);
};

export default NavbarLeft;