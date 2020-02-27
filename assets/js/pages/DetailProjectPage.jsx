import React, {useEffect, useState} from 'react';
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/detailProjectPage.css';
import ImgComponent from "../components/images/ImgComponent";
import Button from "../components/forms/Button";

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


    const projects = [
        {
            id: 0,
            name: "La grande fléche qui pique le cul du ciel",
            description: "Aussi appelée la dame de fer!",
            photo: "../img/projects-img/projects-general-img/0-project-img.jpg",
            statut: "finished",
            adresse1: "Champ de Mars",
            adresse2: "",
            code_postal: "75000",
            ville: "Paris",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 1,
            name: "Ma maison",
            description: "On peut y faire quelques travaux??",
            photo: "../img/projects-img/projects-general-img/1-project-img.jpg",
            statut: "no_start",
            adresse1: "346 rue de Surprise",
            adresse2: "",
            code_postal: "59000",
            ville: "Bonne-Tranche-Sur-Mer",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 2,
            name: "Mon jardin",
            description: "Un petit nettoyage serait pas de refus :-)",
            photo: "../img/projects-img/projects-general-img/2-project-img.jpg",
            statut: "in_progress",
            adresse1: "346 rue de Surprise",
            adresse2: "",
            code_postal: "59000",
            ville: "Bonne-Tranche-Sur-Mer",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 3,
            name: "Le radôme",
            description: "Un super musée",
            photo: "../img/projects-img/projects-general-img/3-project-img.jpg",
            statut: "finished",
            adresse1: "Le Radôme",
            adresse2: "Cité des Télécoms",
            code_postal: "22560",
            ville: "Pleumeur-Bodou",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 4,
            name: "Fort-Mon-Chateau",
            description: "A l'assault Jacqouille!!!!",
            photo: "../img/projects-img/projects-general-img/4-project-img.jpg",
            statut: "in_progress",
            adresse1: "27 rue des Sarrazins",
            adresse2: "",
            code_postal: "15000",
            ville: "Montmirail",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 5,
            name: "Belle-Qui-Dort",
            description: "Un jour mon prince viendra.....",
            photo: "../img/projects-img/projects-general-img/5-project-img.jpg",
            statut: "archived",
            adresse1: "666 allée des somnifères",
            adresse2: "Entrée B",
            code_postal: "00000",
            ville: "Dodo-sur-Isère",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 6,
            name: "Empire State Building",
            description: "C'est haut mon capitaine!",
            photo: "../img/projects-img/projects-general-img/6-project-img.jpg",
            statut: "in_progress",
            adresse1: "20 W 34th Street",
            adresse2: "",
            code_postal: "10001",
            ville: "New-York",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 7,
            name: "Music Arena",
            description: "Le coin des musiciens",
            photo: "../img/projects-img/projects-general-img/7-project-img.jpg",
            statut: "archived",
            adresse1: "123 rue du Clair de la Lune",
            adresse2: "Chez Pierrot",
            code_postal: "98451",
            ville: "Sing Sing",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        },
        {
            id: 8,
            name: "Le paradis des poissons",
            description: "Le grand aquarium restaurant et tout et tout... Fruits de mer à volonté. Thon frais à la demande.",
            photo: "../img/projects-img/projects-general-img/8-project-img.jpg",
            statut: "in_progress",
            adresse1: "56 Bikini Bottom Street",
            adresse2: "Chez Sponge Bob",
            code_postal: "32321",
            ville: "Glouglou Town",
            date_debut: "27/02/2020",
            date_fin_prevu: "20/07/2020"
        }
    ]; //TODO Enlever ces exemples de projets quand requêtes axios

    const id = match.params;

    const [project, setProject] = useState(projects[id.id]); //TODO truc bizarre obligé de passer par là pour récupérer le projet. A faire attention!

    //Récupération d'un projet
    const fetchProject = id => {
        //TODO récupérer le projet avec requête axios

        console.log(projects[id.id]);

        setProject(projects[id.id]); //TODO Attention ca ne fonctionnait pas ici à vérifier plus tard avec axios

        console.log(project);
    };

    //Récupération du bon projet à chaque chargement du composant

    useEffect(() => {
        //TODO Normalement charge le projet à chaque fois que l'id change. Attention plus tard vérifier que tout fonctionne avec axios
        fetchProject(id);
        console.log(project);
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
                    <div className='row ml-2 no-space'>
                        <h6 className='offset-1 col-4'>Fin prévue :</h6>
                        <p className='col-7'>{project.date_fin_prevu}</p>
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