import React, {useEffect, useState} from 'react';
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/detailProjectPage.css';
import ImgComponent from "../components/images/ImgComponent";
import Button from "../components/forms/Button";
import fakeData from "../components/fakeDataForDev/fakeData";
import {Link} from "react-router-dom";

const DetailProjectPage = ({history, match}) => {


    //TODO Refactoriser STATUS CLASSES et STATUS LABEL
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

    const projects = fakeData.fakeListProjects();  //chargement de la fausse liste de projets

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


    const handleBackClick = () => {
        history.replace("/projects");
    };


    return (
        <div className="card m-4 p-2">
            <h2 className='mb-4'>{project.name}</h2>
            <p className='description-style'>{project.description}</p>
            <div className="row mt-2">
                <ImgComponent
                    alt={project.name}
                    src={project.photo}
                    className='col-5 img-fluid rounded img-style'
                />

                <div className='col-6'>
                    <h5 className='mb-3'>Détails:</h5>
                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Adresse :</h6>
                        <p className='col-7'>{project.adresse1}</p>
                    </div>
                    {project.adresse2 &&
                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Complément :</h6>
                        <p className='col-7'>{project.adresse2}</p>
                    </div>
                    }

                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Code Postal :</h6>
                        <p className='col-7'>{project.code_postal}</p>
                    </div>
                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Ville :</h6>
                        <p className='col-7'>{project.ville}</p>
                    </div>
                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Date de début :</h6>
                        <p className='col-7'>{project.date_debut}</p>
                    </div>

                    {project.date_fin_prevues.map(date =>

                        <div className='row ml-2 no-space' key={date.id}>
                            <h6 className='offset-1 col-4'>Fin prévue {date.id + 1} :</h6>
                            <p className='col-7'>{date.date}</p>
                        </div>
                    )}

                    {project.date_fin_reelle && <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Date de fin réélle :</h6>
                        <p className='col-7'>{project.date_fin_reelle}</p>
                    </div>}


                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Nom MOEX :</h6>
                        <p className='col-7'>{project.nom_MOEX}</p>
                    </div>

                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Nom OPC :</h6>
                        <p className='col-7'>{project.nom_OPC}</p>
                    </div>

                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Contact client :</h6>
                        <a className='col-7' href={"mailto:" + project.contact_client}>{project.contact_client}</a>
                    </div>


                    <div className='row ml-2 mt-5'>
                        <h6 className='offset-1 col-4'>Statut :</h6>
                        <p className={"col-2 badge badge-" + STATUS_CLASSES[project.statut]}>{STATUS_LABEL[project.statut]}</p>
                    </div>

                </div>

            </div>
            <div className='row ml-2 mt-4 d-flex justify-content-between mb-3'>
                <Button text='Nouveau rapport'
                        className='btn btn-primary'
                        type='button'
                />
                <Button text='Liste des rapports'
                        className='btn btn-primary'
                        type='button'
                />
                <Button text='Voir les échéances'
                        className='btn btn-primary mr-4'
                        type='button'
                />
                <Button text='Revenir à la liste'
                        className='btn btn-primary mr-4'
                        type='button'
                        onClick={handleBackClick}
                />
            </div>


        </div>
    );
};

export default DetailProjectPage;