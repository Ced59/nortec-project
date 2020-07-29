import React, {useEffect, useState} from 'react';
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/detailProjectPage.css';
import ImgComponent from "../components/images/ImgComponent";
import Button from "../components/forms/Button";
import fakeData from "../components/fakeDataForDev/fakeData";
import {Link} from "react-router-dom";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from '../services/ProjectsAPI';

const DetailProjectPage = ({history, match}) => {
    
    const {id} = match.params;

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

    const [project, setProject] = useState([]); //TODO truc bizarre obligé de passer par là pour récupérer le projet. A faire attention!

//----------------------------------------Récupération d'un projet----------------------------
    const fetchProject = async id => {
        console.log(id)
        try {
            const data = await ProjectsAPI.find(id);
            setProject(data);
            // setLoadingProject(false);

        } catch (error) {
            console.log(error.response);
        }
    }

//Récupération du bon projet à chaque chargement du composant

//---------------------------------------- Chargement de projet au changement de l'id --------
    useEffect(() => {
        fetchProject(id).then(r => '');
    }, [id])


    // const handleBackClick = () => {
    //     history.replace("/projects");
    // };

    // const newReportClick = () => {
    //     //On récupère la liste des faux rapports
    //     //TODO Avec axios créer un nouveau rapport vide (post) dont on récupérera l'id pour le lien
    //     const reports = fakeData.fakeListReports();

    //     const idMax = reports[reports.length - 1].id; //on récupère l'id du dernier rapport
    //     const idNewReport = idMax + 1; //Simulation création rapport vide

    //     history.push("/project/" + id.id + "/" + idNewReport + "/effectifs");

    // };


    return (
        <main className="container">
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
                            <p className='col-7'>{project.codePostal}</p>
                        </div>
                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Ville :</h6>
                            <p className='col-7'>{project.ville}</p>
                        </div>
                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Date de début :</h6>
                            <p className='col-7'>{DateAPI.formatDate(project.dateDebut)}</p>
                        </div>

                        {/* {project.date_fin_prevues.map(date =>

                            <div className='row ml-2 no-space' key={date.id}>
                                <h6 className='offset-1 col-4'>Fin prévue {date.id + 1} :</h6>
                                <p className='col-7'>{DateAPI.formatDate(date.date)}</p>
                            </div>
                        )} */}

                        {DateAPI.verifyDateExist(project.dateFinReelle) === "" ?
                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Date de fin réélle :</h6>
                            <p className='col-7'>Aucune</p>
                        </div>
                        :
                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Date de fin réélle :</h6>
                            <p className='col-7'>{DateAPI.formatDate(project.dateFinReelle)}</p>
                        </div>}


                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Nom MOEX :</h6>
                            <p className='col-7'>{project.nomMOEX}</p>
                        </div>

                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Nom OPC :</h6>
                            <p className='col-7'>{project.nomOPC}</p>
                        </div>

                        <div className='row ml-2 no-space'>
                            <h6 className='offset-1 col-4'>Contact client :</h6>
                            <a className='col-7' href={"mailto:" + project.contactClient}>{project.contactClient}</a>
                        </div>


                        <div className='row ml-2 mt-5'>
                            <h6 className='offset-1 col-4'>Statut :</h6>
                            <p className={"col-2 badge badge-" + STATUS_CLASSES[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}>
                                {STATUS_LABEL[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}</p>
                        </div>

                    </div>

                </div>
                <div className='row ml-2 mt-4 d-flex justify-content-between mb-3'>
                    <Button text='Nouveau Rapport'
                            className='btn btn-primary mr-4'
                            type='button'
                            // onClick={newReportClick}
                    />
                    <Link
                        className='btn btn-primary'
                        type='button'
                        to={'/project/' + project.id + '/listReports'}
                    >
                        Liste des rapports
                    </Link>
                    <Button text='Voir les échéances'
                            className='btn btn-primary mr-4'
                            type='button'
                    />
                    <Button text='Revenir à la liste'
                            className='btn btn-primary mr-4'
                            type='button'
                            // onClick={handleBackClick}
                    />
                </div>

            </div>
        </main>
    );
};

export default DetailProjectPage;