import React, {useEffect, useState} from "react";
import "../../css/detailProjectPage.css";
import "../../css/loading-icon.css";
import ImgComponent from "../components/images/ImgComponent";
import Button from "../components/forms/Button";
import {Link} from "react-router-dom";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import AuthAPI from "../services/AuthAPI";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";
import {
    determineStatusClasses,
    determineStatusLabel,
} from "../components/ProjectStatus";
import ReportsAPI from "../services/ReportsAPI";
import LotModal from "../components/modal/LotModal";
import EcheanceModal from "../components/modal/EcheanceModal";
import EcheanceAPI from "../services/EcheanceAPI";
import useIsMountedRef from "../components/UseIsMountedRef";

const DetailProjectPage = ({history, match, props}) => {
    const isMountedRef = useIsMountedRef();
    const {id} = match.params;

    const [error, setError] = useState({
        name: "",
        description: "",
        photo: "",
        adresse1: "",
        adresse2: "",
        codePostal: "",
        dateDebut: "",
        dateFinReelle: "",
        dateFinPrevues: "",
        nomMOEX: "",
        nomOPC: "",
        contactClient: "",
        ville: "",
        reports: "",
        users: "",
        lots: "",
        companies: "",
    });

    const [project, setProject] = useState({
        name: "",
        description: "",
        photo: "../img/projects-img/projects-general-img/no-photo-project-img.jpg",
        adresse1: "",
        adresse2: "",
        codePostal: "",
        dateDebut: "",
        dateFinReelle: "",
        nomMOEX: "",
        nomOPC: "",
        contactClient: "",
        ville: "",
        reports: [],
        users: [],
        lots: [],
        companies: [],
    });

    const [dateFinPrevue, setDateFinPrevue] = useState("");
    const [edit, setEdit] = useState(false);
    const [loadingProject, setLoadingProject] = useState(true);
    const [errorDate, setErrorDate] = useState("");
    const [errorDateFinReelle, setErrorDateFinRelle] = useState("");
    const [reports, setReports] = useState([]);
    const [report, setReport] = useState({
        Project: "/api/projects/" + id,
        redacteur: AuthAPI.getUserFirstNameLastName(),
        dateRedaction: DateAPI.now(),
        status: "in_progress",
        propreteAccessConformity: "noconform",
        propreteAccessComment: "",
        propreteAccessCommentIntern: "",
        propreteCommuneConformity: false,
        propreteCommuneComment: "",
        propreteCommuneCommentIntern: "",
        securityConformity: false,
        securityConmment: "",
        securityConmmentIntern: "",
        installations: "",
        lots: [],
    });
 
    //----------------------------------------Récupération d'un projet----------------------------
    const fetchProject = async (id) => {
        try {
            const data = await ProjectsAPI.find(id);
        if (isMountedRef.current) {
            setProject(data);
            setLoadingProject(false);
        }
        } catch (error) {
            toast.error("Une erreur est survenue lors du chargement du projet")
        }
    };

    const fetchReports = async () => {
        try {
            const data = await ReportsAPI.findAll();
            if (isMountedRef.current) {
                setReports(data);            
            }
        } catch (error) {
<<<<<<< HEAD
            toast.error("Une erreur est survenue lors du chargement des rapports")
=======
            console.log(error);
            console.log(error.response);
>>>>>>> c081d6daff4b9aa9bbd29f5fde81ffc213393e31
        }
    };

    //Récupération du bon projet à chaque chargement du composant

    //--------------------------------------- Copie des echeances d'un raport------------------

    const copyEcheance = (idNewReport) => {
        EcheanceAPI.findByReport(idNewReport - 1).then((response) => {
            response.forEach((r) => {
                r.report = ["api/reports/" + idNewReport];
                r.lot = "/api/lots/" + r.lot.id;

                EcheanceAPI.create({
                    numeroEcheance: r.numeroEcheance,
                    sujet: r.sujet,
                    dateDebut: r.dateDebut,
                    dateFinPrevue: r.dateFinPrevue,
                    lot: r.lot,
                    redacteur: r.redacteur,
                    report: r.report,
                    zone: r.zone,
                    effectifPrevu: r.effectifPrevu,
                    effectifConstate: r.effectifConstate,
                    comment: r.comment,
                    dateCloture: r.dateCloture,
                });
            });
        });
    };

    //---------------------------------------- Chargement de projet au changement de l'id --------
    useEffect(() => {
        fetchProject(id).then((r) => "");
        fetchReports();
    }, [id]);

    const handleBackClick = () => {
        history.replace("/projects");
    };

    const handleEditClick = () => {
        setEdit(!edit);
    };

    const newReportClick = async () => {
        let idMax;
        let idNewReport;
        if (reports.length !== 0) {
            idMax = reports[reports.length - 1].id;
            idNewReport = idMax + 1;
        } else {
            idNewReport = 1;
        }
        try {
            copyEcheance(idNewReport);
            await ReportsAPI.create(report);
            history.replace("/project/" + id + "/" + idNewReport + "/echeances");
            toast.success("Nouveau rapport créé");
        } catch (error) {
            toast.error("Une erreur est survenue lors de la création du rapport")
        }
    };

    const addFinPrevue = async (e) => {
        e.preventDefault();

        if (
            DateAPI.dateIsAfter(
                dateFinPrevue,
                project.dateDebut,
                project.dateFinPrevues
            )
        ) {
            setErrorDate("");
            try {
                const dateToCreate = {
                    date: dateFinPrevue,
                    Project: "/api/projects/" + project.id,
                };

                await ProjectsAPI.addFinPrevueProject(dateToCreate).then((r) => {
                    project.dateFinPrevues.push(dateToCreate);
                    setProject(project);
                });

                toast.success("La date a bien été ajoutée.");
                setEdit(false);
            } catch (error) {
                toast.error("Une erreur est survenue pendant l'ajout de la date.");
            }
        } else {
            setErrorDate("La nouvelle date doit être postérieure aux autres");
        }
    };

    const handleChangeFinReelle = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setProject({...project, [name]: value});

        DateAPI.dateIsAfterDebut(value, project.dateDebut)
            ? setErrorDateFinRelle("")
            : setErrorDateFinRelle(
            "La date de fin réélle doit être postérieure à la date de début!"
            );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            project.users = project.users.map(
                (userInProject) => "/api/users/" + userInProject.id
            );
            project.dateFinPrevues = project.dateFinPrevues.map(
                (dateInProject) => "/api/project_date_fin_prevues/" + dateInProject.id
            );
            project.lots = project.lots.map((lot) => "/api/lots/" + lot.id);
            await ProjectsAPI.update(id, project);
            toast.success("Le projet a bien été mis à jour !");
            await fetchProject(id);
            setEdit(false);
        } catch ({response}) {
            toast.error("Un problème est survenu pendant la mise à jour du projet.");
        }
    };

    //--------------------------------------------Template  --------------------------------------------------------

    return (
        <main className="container">
            <div className="card m-4 p-2">
                {!loadingProject ? (
                    <>
                        <h2 className="mb-4">{project.name}</h2>
                        <p className="description-style">{project.description}</p>
                        <div className="d-flex flex-lg-row flex-column mt-2">
                            <ImgComponent
                                alt={project.name}
                                src={project.photo}
                                className="col-12 col-lg-6 mx-auto img-fluid rounded img-style"
                            />

                            <div className="col-12 col-lg-6">
                                <h5 className="text-center text-sm-left mb-3">Détails:</h5>
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Adresse :</h6>
                                    <p className="col-7">{project.adresse1}</p>
                                </div>
                                {project.adresse2 && (
                                    <div className="row no-space">
                                        <h6 className="offset-sm-1 col-4">Complément :</h6>
                                        <p className="col-7">{project.adresse2}</p>
                                    </div>
                                )}

                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Code Postal :</h6>
                                    <p className="col-7">{project.codePostal}</p>
                                </div>
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Ville :</h6>
                                    <p className="col-7">{project.ville}</p>
                                </div>
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Date de début :</h6>
                                    <p className="col-7">
                                        {DateAPI.formatDate(project.dateDebut)}
                                    </p>
                                </div>

                                {project.dateFinPrevues.length !== 0 && (
                                    <>
                                        {project.dateFinPrevues.map((date) => (
                                            <div className="row no-space" key={date.id}>
                                                <h6 className="offset-sm-1 col-4">
                                                    Fin prévue{" "}
                                                    {project.dateFinPrevues.indexOf(date) + 1} :
                                                </h6>
                                                <p className="col-7">
                                                    {DateAPI.formatDate(date.date)}
                                                </p>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {edit && (
                                    <div className="row no-space">
                                        <h6 className="offset-sm-1 col-4">
                                            Ajouter une date de fin prévue :
                                        </h6>
                                        <Field
                                            name="dateFinPrevue"
                                            type="date"
                                            onChange={(e) => setDateFinPrevue(e.target.value)}
                                            value={dateFinPrevue}
                                            noLabel={true}
                                            error={errorDate}
                                        />
                                        <Button text="Valider"
                                                type="button"
                                                className="btn btn-danger btn-sm ml-2 mb-3"
                                                onClick={addFinPrevue}
                                        />
                                    </div>
                                )}
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">
                                        Date de fin réélle :
                                    </h6>
                                    <p className="col-7">
                                        {!project.dateFinReelle
                                            ? "Aucune"
                                            : DateAPI.formatDate(project.dateFinReelle)}
                                    </p>
                                </div>
                                {edit && (
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="row no-space">
                                            <h6 className="offset-sm-1 col-4">
                                                Ajouter la date de fin réélle :
                                            </h6>
                                            <Field
                                                name="dateFinReelle"
                                                type="date"
                                                onChange={handleChangeFinReelle}
                                                value={
                                                !project.dateFinReelle
                                                    ? DateAPI.formatDateFormConst(DateAPI.now())
                                                    : DateAPI.formatDateForm(project.dateFinReelle)
                                                }
                                                noLabel={true}
                                                error={errorDateFinReelle}
                                                />
                                            <Button
                                            text="Valider"
                                            className="btn btn-danger btn-sm ml-2 mb-3"
                                            onSubmit={handleSubmit}
                                            />
                                        </div>
                                    </form>
                                )}
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Nom MOEX :</h6>
                                    <p className="col-7">{project.nomMOEX}</p>
                                </div>
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Nom OPC :</h6>
                                    <p className="col-7">{project.nomOPC}</p>
                                </div>
                                <div className="row no-space">
                                    <h6 className="offset-sm-1 col-4">Contact client :</h6>
                                    <a
                                        className="col-7"
                                        href={"mailto:" + project.contactClient}
                                    >
                                        {project.contactClient}
                                    </a>
                                </div>
                                <div className="row mt-5">
                                    <h6 className="offset-sm-1 col-4">Statut :</h6>
                                    <p
                                        className={
                                            "col-2 badge badge-" +
                                            determineStatusClasses(
                                                project.dateDebut,
                                                project.dateFinReelle
                                            )
                                        }
                                    >
                                        {determineStatusLabel(
                                            project.dateDebut,
                                            project.dateFinReelle
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div> 
                        <div className="mt-4 d-flex justify-content-center justify-content-lg-between flex-wrap mb-3">
                            <Button
                                text="Nouveau Rapport"
                                className="btn btn-primary mx-2 mb-3"
                                type="button"
                                onClick={newReportClick}
                            />
                            <Link
                                className="btn btn-primary mx-2 mb-3"
                                to={"/project/" + project.id + "/listReports"}
                            >
                                Liste des rapports
                            </Link>
                            <LotModal
                                id={id}
                                project={project}
                                loadingProject={loadingProject}
                                fetchProject={fetchProject}
                            ></LotModal>
                            <EcheanceModal project={project}></EcheanceModal>

                            {AuthAPI.isAdmin() && (
                                <Button
                                    text={
                                        !edit
                                            ? "Modifier le projet"
                                            : "Revenir aux détails du projet"
                                    }
                                    className={
                                        "btn btn-" + (!edit ? "primary" : "info") + " mx-2 mb-3"
                                    }
                                    type="button"
                                    onClick={handleEditClick}
                                />
                            )}

                            <Button
                                text="Revenir à la liste"
                                className="btn btn-danger md-mt-2 mx-2 mb-3"
                                type="button"
                                onClick={handleBackClick}
                            />
                        </div>
                    </>
                ) : (
                    <div id="loading-icon"/>
                )}
            </div>
        </main>
    );
};

export default DetailProjectPage;
