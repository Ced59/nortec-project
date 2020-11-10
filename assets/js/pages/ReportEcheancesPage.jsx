import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import "../../css/app.css";
import Modal from "react-bootstrap/Modal";
import Field from "../components/forms/Field";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import {
  statusEcheanceClasses,
  statusEcheanceLabel,
} from "../components/ProjectStatus";
import ReportsAPI from "../services/ReportsAPI";
import EcheanceAPI from "../services/EcheanceAPI";
import { toast } from "react-toastify";
import AddEcheanceModal from "../components/modal/AddEcheanceModal";

const ReportEcheancesPage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const [showModalDetail, setShowModalDetail] = useState(false);

  const [echeanceError, setEcheanceError] = useState({
    numeroEcheance: "",
    categorie: "",
    sujet: "",
    dateDebut: "",
    effectifPrevu: "",
    effectifConstate: "",
    lot: "",
  });

  const echeanceErrorModel = useState(echeanceError);
  const [report, setReport] = useState({});
  const [project, setProject] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [echeanceDetail, setEcheanceDetail] = useState({});

  const urlParams = match.params;

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
    } catch (error) {
      toast.error("Erreur lors du chargement du raport");
      console.log(error.response);
    }
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      setProject(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement du projet");
      console.log(error.response);
    }
  };

  const fetchEcheance = async (id) => {
    try {
      const data = await EcheanceAPI.findEcheance(id);
      setEcheanceDetail(data);
      console.log(echeanceDetail);
    } catch (error) {
      toast.error("Erreur lors du chargement de l'échéance");
      console.log(error.response);
    }
  };

  // Chargement du raport si besoin au chargement du composant ou au changement de l'identifiant
  useEffect(() => {
    fetchReport(urlParams.idReport);
    fetchProject(urlParams.id);
  }, [urlParams.idReport, urlParams.id]);

  // Gestion de la fenêtre modal Detail Echeance

  const handleSubmitChangeEcheance = async (event) => {
    event.preventDefault();
    if (
      DateAPI.dateIsAfterDebut(
        echeanceDetail.dateFinPrevue,
        echeanceDetail.dateDebut
      )
    ) {
      try {
        console.log(echeanceDetail);
        echeanceDetail.lot = "/api/lots/" + echeanceDetail.lot.id;

        await EcheanceAPI.update(echeanceDetail.id, echeanceDetail);
        toast.success("L'échéance est bien modifiée !");
        setEcheanceDetail({});
        fetchProject(urlParams.id);
        handleCloseModalDetail();
      } catch ({ reponse }) {
        const { violations } = response.data;
        if (violations) {
          const apiErrors = {};
          violations.map(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setEcheanceError(apiErrors);
        }
        console.log(error.response);
      }
    } else {
      setEcheanceError({
        ...echeanceError,
        dateFinPrevue: "Veuillez entrer une date posterieur",
      });
    }
  };

  const handleShowModalDetail = async (id) => {
    await fetchEcheance(id);
    setShowModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setEcheanceError(echeanceErrorModel);
    setShowModalDetail(false);
    setEdit(false);
  };

  const handleChangeEcheanceDetail = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheanceDetail({ ...echeanceDetail, [name]: value });
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  return (
    <>
      <main>
        <NavbarLeftWithRouter selected="echeances" />
        {!loading && (
          <>
            <div className="page-content">
              <h2 className="mb-4">Echéances : </h2>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Numéro</th>
                    <th>Rédacteur</th>
                    <th>Statut</th>
                    {/* <th>Catégorie</th> */}
                    <th>Sujet</th>
                    <th>Début</th>
                    <th>Echéance</th>
                    <th>Clotûre</th>
                    <th>Retard</th>
                    <th>En charge</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {project.lots.map((lot) => (
                    <React.Fragment key={lot.id}>
                      {lot.echeances.map((echeance) => (
                        <tr key={echeance.id}>
                          <td>{echeance.numeroEcheance}</td>
                          <td>{echeance.redacteur}</td>
                          <td>
                            <span
                              className={
                                "badge badge-" +
                                statusEcheanceClasses(
                                  echeance.dateDebut,
                                  echeance.dateCloture,
                                  echeance.dateFinPrevue
                                )
                              }
                            >
                              {statusEcheanceLabel(
                                echeance.dateDebut,
                                echeance.dateCloture,
                                echeance.dateFinPrevue
                              )}
                            </span>
                          </td>
                          {/* <td>{echeance.categorie}</td> */}
                          <td>{echeance.sujet}</td>
                          <td>{DateAPI.formatDate(echeance.dateDebut)}</td>
                          <td>{DateAPI.formatDate(echeance.dateFinPrevue)}</td>
                          <td>{DateAPI.formatDate(echeance.dateCloture)}</td>
                          <td>
                            {DateAPI.retard(
                              echeance.dateCloture,
                              echeance.dateFinPrevue
                            ) > 0 &&
                              DateAPI.retard(
                                echeance.dateCloture,
                                echeance.dateFinPrevue
                              )}
                          </td>
                          <td>{lot.company.nom}</td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              text="Détails"
                              onClick={() => handleShowModalDetail(echeance.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <AddEcheanceModal
                project={project}
                loading={loading}
                echeanceError={echeanceError}
                setEcheanceError={setEcheanceError}
                echeanceErrorModel={echeanceErrorModel}
                fetchProject={fetchProject}
                urlParams={urlParams}
              ></AddEcheanceModal>
            </div>
          </>
        )}
      </main>

      {/*-------------------- Fenêtre modal pour le detail des échéances ----------------------------*/}

      {!loading && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showModalDetail}
          onHide={handleCloseModalDetail}
        >
          <Modal.Header closeButton>
            <h2>Detail de l'échéance N° {echeanceDetail.id}</h2>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitChangeEcheance}>
              <div className="container d-flex  flex-wrap justify-content-around">
                <div className="col-12 d-flex justify-content-around border-detail">
                  <p>Redacteur: {echeanceDetail.redacteur} </p>
                  {echeanceDetail.lot && (
                    <p>N° Lot: {echeanceDetail.lot.numeroLot} </p>
                  )}
                </div>
                <div className="col-5 mt-3 border-detail d-flex flex-column justify-content-center">
                  <p>Categorie: {echeanceDetail.categorie} </p>
                  <p>Sujet: {echeanceDetail.sujet} </p>
                  <p>
                    Statut:{" "}
                    <span
                      className={
                        "badge badge-" +
                        statusEcheanceClasses(
                          echeanceDetail.dateDebut,
                          echeanceDetail.dateCloture,
                          echeanceDetail.dateFinPrevue
                        )
                      }
                    >
                      {statusEcheanceLabel(
                        echeanceDetail.dateDebut,
                        echeanceDetail.dateCloture,
                        echeanceDetail.dateFinPrevue
                      )}
                    </span>
                  </p>
                </div>
                {edit ? (
                  <div className="col-5 mt-3 border-detail">
                    <Field
                      name="dateDebut"
                      label="Date de debut:"
                      type="date"
                      onChange={handleChangeEcheanceDetail}
                      value={DateAPI.formatDateForm(echeanceDetail.dateDebut)}
                    ></Field>
                    <Field
                      name="dateFinPrevue"
                      label="Date de fin prevue:"
                      type="date"
                      onChange={handleChangeEcheanceDetail}
                      error={echeanceError.dateFinPrevue}
                      value={DateAPI.formatDateForm(
                        echeanceDetail.dateFinPrevue
                      )}
                    ></Field>
                    <Field
                      name="dateCloture"
                      label="Date de cloture:"
                      type="date"
                      onChange={handleChangeEcheanceDetail}
                      value={DateAPI.formatDateForm(echeanceDetail.dateCloture)}
                    ></Field>
                  </div>
                ) : (
                  <div className="col-5 mt-3 border-detail">
                    <p className="mt-3">
                      Debut: {DateAPI.formatDate(echeanceDetail.dateDebut)}{" "}
                    </p>
                    <p>
                      Fin prévue:{" "}
                      {DateAPI.formatDate(echeanceDetail.dateFinPrevue)}{" "}
                    </p>

                    <p>
                      Fini le: {DateAPI.formatDate(echeanceDetail.dateCloture)}{" "}
                    </p>
                    {DateAPI.retard(
                      echeanceDetail.dateCloture,
                      echeanceDetail.dateFinPrevue
                    ) > 0 && (
                      <p>
                        Retard:{" "}
                        {DateAPI.retard(
                          echeanceDetail.dateCloture,
                          echeanceDetail.dateFinPrevue
                        )}
                      </p>
                    )}
                  </div>
                )}
                <div className="col-12 border-detail mt-3">
                  {echeanceDetail.lot && (
                    <p className="mt-3">
                      Entreprise en charge: {echeanceDetail.lot.company.nom}{" "}
                    </p>
                  )}

                  <p>Effectif prévu: {echeanceDetail.effectifPrevu}</p>
                  <p>Effectif constaté: {echeanceDetail.effectifConstate}</p>
                </div>
                <div className="col-12 mt-3 d-flex justify-content-end">
                  {edit && (
                    <Button className="btn btn-success" text="Valider"></Button>
                  )}
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {!edit ? (
              <Button
                className="btn btn-primary"
                text="Modifier"
                onClick={handleEdit}
              ></Button>
            ) : (
              <>
                <Button
                  className="btn btn-danger"
                  text="Annuler"
                  onClick={handleCloseEdit}
                ></Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      )}
      {loading && <div id="loading-icon"> </div>}
    </>
  );
};

export default ReportEcheancesPage;
