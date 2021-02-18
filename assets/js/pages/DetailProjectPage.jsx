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
import DivRowTitle from "../components/wrapper/DivRowTitle";

const DetailProjectPage = ({history, match, props}) => {
    const isMountedRef = useIsMountedRef();
    const {id} = match.params;
    const [project, setProject] = useState({});
    const [dateFinPrevue, setDateFinPrevue] = useState("");
    const [edit, setEdit] = useState(false);
    const [loadingProject, setLoadingProject] = useState(true);
    const [errorDate, setErrorDate] = useState("");
    const [errorDateFinReelle, setErrorDateFinRelle] = useState("");
    const report = {
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
    };
 
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

    //--------------------------------------- Copie des echeances d'un rapport------------------

    const copyEcheance = (idLastReport,idNewReport) => {
        ReportsAPI.getEcheances(idLastReport).then((response) => {
            Promise.all(
                response.map(r => 
                    EcheanceAPI.create({
                        numeroEcheance: r.numeroEcheance,
                        sujet: r.sujet,
                        dateDebut: r.dateDebut,
                        dateFinPrevue: r.dateFinPrevue,
                        lot: "/api/lots/" + r.lot.id,
                        redacteur: r.redacteur,
                        report: ["api/reports/" + idNewReport],
                        zone: r.zone,
                        effectifPrevu: r.effectifPrevu,
                        effectifConstate: r.effectifConstate,
                        comment: r.comment,
                        dateCloture: r.dateCloture,
                    })
                )
            ).then(newReportCreated(idNewReport));
        });
    };

    //---------------------------------------- Chargement de projet au changement de l'id --------
    useEffect(() => {
        fetchProject(id);
    }, [id]);

    const newReportCreated = (idNewReport) => {
        toast.success("Nouveau rapport créé");
        history.replace("/project/" + id + "/" + idNewReport + "/echeances");
    }

    const newReportClick = async (e) => {
        const btn = e.target;
        btn.disabled = true;
        try {
            await ReportsAPI.create(report).then(r=>{
                const idNewReport = r.data.id;
                const projectReports = project.reports;
                const lastReport = projectReports[projectReports.length - 1];
                if (lastReport) {
                    const idLastReport = Number(lastReport.split("/")[3]);
                    copyEcheance(idLastReport, idNewReport);
                } else newReportCreated(idNewReport);
            });
        } catch (error) {
            toast.error("Une erreur est survenue lors de la création du rapport");
            btn.disabled = false;
        }
    };

    const addFinPrevue = async () => {
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

    const handleSubmitDateFinReelle = async () => {
        const dateFinReelleProject = { dateFinReelle : project.dateFinReelle }
        try {
            await ProjectsAPI.update(id, dateFinReelleProject);
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
                                <DivRowTitle title={"Adresse :"}>
                                    <p className="col-7">{project.adresse1}</p>
                                </DivRowTitle>
                                {project.adresse2 && (
                                    <DivRowTitle title={"Complément :"}>
                                        <p className="col-7">{project.adresse2}</p>
                                    </DivRowTitle>
                                )}

                                <DivRowTitle title={"Code Postal :"}>
                                    <p className="col-7">{project.codePostal}</p>
                                </DivRowTitle>
                                <DivRowTitle title={"Ville :"}>
                                    <p className="col-7">{project.ville}</p>
                                </DivRowTitle>
                                <DivRowTitle title={"Date de début :"}>
                                    <p className="col-7">
                                        {DateAPI.formatDate(project.dateDebut)}
                                    </p>
                                </DivRowTitle>

                                {project.dateFinPrevues.length !== 0 && (
                                    <>
                                        {project.dateFinPrevues.map((date,i) => (
                                            <DivRowTitle title={"Fin prévue "+Number(i+1)+" :"} key={date.id}>
                                                <p className="col-7">
                                                    {DateAPI.formatDate(date.date)}
                                                </p>
                                            </DivRowTitle>
                                        ))}
                                    </>
                                )}
                                {edit && (
                                    <DivRowTitle title={"Ajouter une date de fin prévue :"}>
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
                                    </DivRowTitle>
                                )}
                                <DivRowTitle title={"Date de fin réélle :"}>
                                    <p className="col-7">
                                        {!project.dateFinReelle
                                            ? "Aucune"
                                            : DateAPI.formatDate(project.dateFinReelle)}
                                    </p>
                                </DivRowTitle>
                                {edit && (
                                        <DivRowTitle title={"Ajouter la date de fin réélle :"}>
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
                                            type="button"
                                            text="Valider"
                                            className="btn btn-danger btn-sm ml-2 mb-3"
                                            onClick={handleSubmitDateFinReelle}
                                            />
                                        </DivRowTitle>
                                )}
                                <DivRowTitle title={"Nom MOEX :"}>
                                    <p className="col-7">{project.nomMOEX}</p>
                                </DivRowTitle>
                                <DivRowTitle title={"Nom OPC :"}>
                                    <p className="col-7">{project.nomOPC}</p>
                                </DivRowTitle>
                                <DivRowTitle title={"Contact client :"}>
                                    <div className="col-7">
                                        <a 
                                            href={"mailto:" + project.contactClient}
                                            >
                                            {project.contactClient}
                                        </a>
                                    </div>
                                </DivRowTitle>
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
                                    onClick={()=>setEdit(!edit)}
                                />
                            )}

                            <Link className="btn btn-danger md-mt-2 mx-2 mb-3" to="/projects">
                                Revenir à la liste
                            </Link>
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
