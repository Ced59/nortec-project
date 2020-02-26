import React, {useEffect, useState} from 'react';
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/listProjectsPage.css';
import {Helmet} from "react-helmet";

const ListProjectsPage = (props) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(
            // Création d'un faux tableau pour les tests
            [
                {
                    id: 1,
                    name: "Ma maison",
                    description: "On peut y faire quelques travaux??",
                    photo: "../img/projects-img/projects-general-img/1-project-img.jpg",
                    statut: "Pas démarré"
                },
                {
                    id: 2,
                    name: "Mon jardin",
                    description: "Un petit nettoyage serait pas de refus :-)",
                    photo: "../img/projects-img/projects-general-img/2-project-img.jpg",
                    statut: "En cours"
                },
                {
                    id: 3,
                    name: "Le radôme",
                    description: "Un super musée",
                    photo: "../img/projects-img/projects-general-img/3-project-img.jpg",
                    statut: "Fini"
                },
                {
                    id: 4,
                    name: "Fort-Mon-Chateau",
                    description: "A l'assault Jacqouille!!!!",
                    photo: "../img/projects-img/projects-general-img/4-project-img.jpg",
                    statut: "En cours"
                },
                {
                    id: 5,
                    name: "Belle-Qui-Dort",
                    description: "Un jour mon prince viendra.....",
                    photo: "../img/projects-img/projects-general-img/5-project-img.jpg",
                    statut: "Archivé"
                },
                {
                    id: 6,
                    name: "Vertigo",
                    description: "C'est haut mon capitaine!",
                    photo: "../img/projects-img/projects-general-img/6-project-img.jpg",
                    statut: "En cours"
                }
            ]
        );
    });


    return (
        <>
            <Helmet>
                <style>{'body { background-color: white; }'}</style>
            </Helmet>
            <div className="card-group">
                {projects.map(project =>
                    <div key={project.id}>

                        <div className="card m-4" style={{width: '20rem', height: '24rem'}}>
                            <ImgWithStyleComponent
                                className="card-img-top p-1"
                                src={project.photo}
                                alt={project.name}
                                style={{height: "10rem"}}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <p className="card-text">Description: {project.description}</p>

                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default ListProjectsPage;