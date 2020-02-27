import React, {useContext, useEffect, useState} from 'react';
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import '../../css/listProjectsPage.css';
import {Helmet} from "react-helmet";
import SearchContext from "../contexts/SearchContext";
import {Link} from "react-router-dom";
import CheckBoxInLine from "../components/forms/CheckBoxInLine";
import Button from "../components/forms/Button";


const ListProjectsPage = (props) => {

    const [projects, setProjects] = useState([]);
    const [archivedProjects, setArchivedProjects] = useState(false);
    const {searchValue} = useContext(SearchContext);

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

    useEffect(() => {
        setProjects(
            // Création d'un faux tableau pour les tests
            // TODO Implémenter les requêtes axios
            [
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
            ]
        );
    });


    const filteredArchivedProjects = projects.filter(
        archivedProjects
            ?
            p =>
                p.statut === 'archived' ||
                p.statut === 'no_start' ||
                p.statut === 'in_progress' ||
                p.statut === 'finished'
            :
            p =>
                p.statut === 'no_start' ||
                p.statut === 'in_progress' ||
                p.statut === 'finished'
    );  //TODO Trouver façon de refactoriser cette condition... C'est moche...


    const filteredProjects = filteredArchivedProjects.filter(
        p =>
            p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            p.statut.toLowerCase().includes(searchValue.toLowerCase()) ||
            p.ville.toLowerCase().includes(searchValue.toLowerCase())
    );

    const onChangeArchivedShow = event => {
        setArchivedProjects(!archivedProjects);
        //TODO: Optimisation voir si on charge tout et on change l'affichage ou si l'on charge uniquement le nécessaire. Si chargement ou pas quand on affiche archivés...
    };


    return (
        <>
            <Helmet>
                <style>{'body { background-color: white; }'}</style>
            </Helmet>
            <div className="row">
                <h2 className="col-3">Liste des projets : </h2>
                <div className="offset-6">
                    <Button
                        onClick={onChangeArchivedShow}
                        text={archivedProjects ? "Cacher les projets archivés" : "Montrer les projets archivés"}
                        className="btn btn-secondary text-right"
                        type="button"
                    />
                </div>
            </div>

            <div className="card-group">

                {filteredProjects.length === 0 ?
                    <p className="mt-2 font-weight-bold font-italic">Désolé il n'y a pas de résultat pour votre
                        recherche...</p>
                    :
                    filteredProjects.map(project =>
                        <Link style={{textDecorationLine: "none", color: "black"}} to={"/project/" + project.id}
                              key={project.id}>

                            <div className="card m-4" style={{width: '20rem', height: '26rem'}}>

                                <h5 className="card-title p-2">{project.name}</h5>

                                <ImgWithStyleComponent
                                    className="card-img-top"
                                    src={project.photo}
                                    alt={project.name}
                                    style={{height: "10rem"}}
                                />
                                <div className="card-body">
                                    <p className="card-text text-right mb-3">{project.ville}</p>
                                    <p className="card-text mb-1">Description:</p>
                                    <p className="font-weight-light font-italic card-text">{project.description}</p>

                                </div>
                                <div className="card-footer pb-0 text-right">
                                    <p><span
                                        className={"pl-2 pr-2 pt-1 pb-1 badge badge-" + STATUS_CLASSES[project.statut]}>{STATUS_LABEL[project.statut]}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    );
};

export default ListProjectsPage;