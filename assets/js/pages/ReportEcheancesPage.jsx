import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Select from "../components/forms/Select";
import Button from "../components/forms/Button";
import "../../css/app.css";
import Modal from "react-bootstrap/Modal";
import Field from "../components/forms/Field";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import {
  determineStatusClasses,
  determineStatusLabel,
} from "../components/ProjectStatus";
import AuthAPI from "../services/AuthAPI";
import ReportsAPI from "../services/ReportsAPI";
import EcheanceAPI from "../services/EcheanceAPI";
import { toast } from "react-toastify";

const ReportEcheancesPage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const [showModalEcheance, setShowModalEcheance] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [echeance, setEcheance] = useState({
    numeroEcheance: "",
    redacteur: AuthAPI.getUserFirstNameLastName(),
    categorie: "",
    sujet: "",
    dateDebut: "",
    dateFin: "",
    lot: "",
    report: [],
  });
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
      console.log(error.response);
    }
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      setProject(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchEcheance = async (id) => {
    try {
      const data = await EcheanceAPI.findEcheance(id);
      setEcheanceDetail(data);
      console.log(echeanceDetail);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Chargement du raport si besoin au chargement du composant ou au changement de l'identifiant
  useEffect(() => {
    fetchReport(urlParams.idReport);
    fetchProject(urlParams.id);
  }, [urlParams.idReport, urlParams.id]);

  // Gestion de la fenêtre modal AddEcheance

  const handleShowModalEcheance = () => {
    setShowModalEcheance(true);
  };

  const handleCloseModalEcheance = () => {
    setShowModalEcheance(false);
  };

  const handleChangeEcheance = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheance({ ...echeance, [name]: value });
  };

  const handleSubmitAddEcheance = async (event) => {
    event.preventDefault();
    try {
      echeance.lot = "/api/lots/" + echeance.lot;
      echeance.numeroEcheance = Number(echeance.numeroEcheance);
      console.log(echeance);

      await EcheanceAPI.create(echeance);

      toast.success("L'échéance est bien ajouté !");
      fetchProject(urlParams.id);
      handleCloseModalEcheance();
    } catch (error) {
      console.log(error);
    }
  };

  // Gestion de la fenêtre modal Detail Echeance

  const handleSubmitChangeEcheance = async (event) => {
    event.preventDefault();
    try {
      console.log(echeanceDetail);
      echeanceDetail.lot = "/api/lots/" + echeanceDetail.lot.id;

      await EcheanceAPI.update(echeanceDetail.id, echeanceDetail);
      toast.success("L'échéance est bien modifiée !");
      setEcheanceDetail({});
      fetchProject(urlParams.id);
      handleCloseModalDetail();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleShowModalDetail = async (id) => {
    await fetchEcheance(id);
    setShowModalDetail(true);
  };

  const handleCloseModalDetail = () => {
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
                    <th>Catégorie</th>
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
                          <td>{echeance.id}</td>
                          <td>{echeance.redacteur}</td>
                          <td>
                            <span
                              className={
                                "badge badge-" +
                                determineStatusClasses(
                                  echeance.dateDebut,
                                  echeance.dateCloture,
                                  echeance.dateFinPrevue
                                )
                              }
                            >
                              {determineStatusLabel(
                                echeance.dateDebut,
                                echeance.dateCloture,
                                echeance.dateFinPrevue
                              )}
                            </span>
                          </td>
                          <td>{echeance.categorie}</td>
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
              <Button
                className="btn btn-primary"
                text="Ajouter une échéance"
                onClick={() => handleShowModalEcheance()}
              />
            </div>
          </>
        )}
      </main>

      {/*-------------------- Fenêttre modal pour l'ajout d'une échéance ------------------------------*/}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalEcheance}
        onHide={handleCloseModalEcheance}
      >
        {!loading && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter une échéance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitAddEcheance}>
                <Field
                  name="categorie"
                  label="Catégorie"
                  onChange={handleChangeEcheance}
                  value={echeance.categorie}
                ></Field>
                <Field
                  name="sujet"
                  label="Sujet"
                  onChange={handleChangeEcheance}
                  value={echeance.sujet}
                ></Field>
                <Field
                  type="number"
                  name="numeroEcheance"
                  label="Numero de l'échéance"
                  onChange={handleChangeEcheance}
                  value={echeance.numeroEcheance}
                ></Field>
                <Field
                  name="dateDebut"
                  label="Date de début"
                  type="date"
                  onChange={handleChangeEcheance}
                  value={echeance.dateDebut}
                ></Field>
                <Field
                  name="dateFinPrevue"
                  label="Date de fin prévue"
                  type="date"
                  onChange={handleChangeEcheance}
                  value={DateAPI.formatDateForm(echeance.dateFinPrevue)}
                ></Field>
                <Field
                  name="effectifPrevu"
                  label="Effectif Prévu"
                  type="number"
                  onChange={handleChangeEcheance}
                  value={echeance.effectifPrevu}
                ></Field>
                <Select
                  name="lot"
                  onChange={handleChangeEcheance}
                  value={echeance.lot}
                >
                  <option>Selectionner une entreprise</option>
                  {project.lots.map((lot) => (
                    <option key={lot.id} value={lot.id}>
                      {lot.libelleLot}
                    </option>
                  ))}
                </Select>
                <Modal.Footer>
                  <Button className="btn btn-primary" text="Ajouter"></Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/*-------------------- Fenêttre modal pour le detail des échéances ----------------------------*/}

      {/* TODO faire le changement des effectifs une fois les champs ajouté à l'échéance dans BDD */}

      {!loading && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showModalDetail}
          onHide={handleCloseModalDetail}
        >
          <Modal.Header>
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
                        determineStatusClasses(
                          echeanceDetail.dateDebut,
                          echeanceDetail.dateCloture,
                          echeanceDetail.dateFinPrevue
                        )
                      }
                    >
                      {determineStatusLabel(
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
                      value={DateAPI.formatDateForm(echeanceDetail.dateFinPrevue)}
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
                  {echeanceDetail.effectif && (
                    <>
                      <p>
                        Effectif prévu: {echeanceDetail.effectif.effectifPrevu}
                      </p>
                      <p>
                        Effectif constaté:{" "}
                        {echeanceDetail.effectif.effectifConstate}
                      </p>
                    </>
                  )}
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
