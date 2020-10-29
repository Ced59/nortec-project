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
import { STATUS_CLASSES, STATUS_LABEL } from "../components/ProjectStatus";
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

  const handleShowModalEcheance = () => {
    setShowModalEcheance(true);
  };
  const handleShowModalDetail = async (id) => {
    await fetchEcheance(id);
    setShowModalDetail(true);
  };

  const handleCloseModalEcheance = () => {
    setShowModalEcheance(false);
  };

  const handleCloseModalDetail = () => {
    setShowModalDetail(false);
    setEdit(false);
  };

  const handleChangeEcheance = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheance({ ...echeance, [name]: value });
  };
  const handleChangeEcheanceDetail = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheanceDetail({ ...echeanceDetail, [name]: value });
  };

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

  const handleSubmitAddEcheance = async (event) => {
    event.preventDefault();
    try {
      echeance.lot = "/api/lots/" + echeance.lot;
      echeance.numeroEcheance = Number(echeance.numeroEcheance);
      console.log(echeance);

      await EcheanceAPI.create(echeance);

      toast.success("L'échéance est bien ajouté !");
      handleCloseModalEcheance();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitChangeEcheance = async (event) => {
    event.preventDefault();
    try {
      console.log(echeanceDetail);

      await EcheanceAPI.update(echeanceDetail.id, echeanceDetail);

      toast.success("L'échéance est bien modifiée !");
      handleCloseModalEcheance();
    } catch (error) {
      console.log(error);
    }
  };

  // Chargement du raport si besoin au chargement du composant ou au changement de l'identifiant
  useEffect(() => {
    fetchReport(urlParams.idReport);
    console.log(report);
  }, [urlParams.idReport]);

  useEffect(() => {
    fetchProject(urlParams.id);
  }, [urlParams.id]);

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
                    <>
                      {lot.echeances.map((echeance) => (
                        <tr key={echeance.id}>
                          <td>{echeance.id}</td>
                          <td>{echeance.redacteur}</td>
                          <td>
                            <span
                              className={
                                "badge badge-" +
                                STATUS_CLASSES[
                                  DateAPI.determineStatus(
                                    echeance.dateDebut,
                                    DateAPI.verifyDateExist(
                                      echeance.dateCloture
                                    ),
                                    echeance.dateFinPrevue
                                  )
                                ]
                              }
                            >
                              {
                                STATUS_LABEL[
                                  DateAPI.determineStatus(
                                    echeance.dateDebut,
                                    DateAPI.verifyDateExist(
                                      echeance.dateCloture
                                    ),
                                    echeance.dateFinPrevue
                                  )
                                ]
                              }
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
                    </>
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
                <Select
                  name="lot"
                  onChange={handleChangeEcheance}
                  value={echeance.lot}
                >
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
                  <p>N° Lot: </p>
                </div>
                <div className="col-5 mt-3 border-detail d-flex flex-column justify-content-center">
                  <p>Categorie: {echeanceDetail.categorie} </p>
                  <p>Sujet: {echeanceDetail.sujet} </p>
                  <p>Statut: {STATUS_LABEL[echeanceDetail.status]}</p>
                </div>
                <div className="col-5 mt-3 border-detail">
                  <p className="mt-3">
                    Debut: {DateAPI.formatDate(echeanceDetail.dateDebut)}{" "}
                  </p>
                  <p>
                    Fin prévue:{" "}
                    {DateAPI.formatDate(echeanceDetail.dateFinPrevue)}{" "}
                  </p>
                  {edit ? (
                    <Field
                      name="dateCloture"
                      label="Date de Cloture:"
                      type="date"
                      onChange={handleChangeEcheanceDetail}
                      value={DateAPI.formatDateForm(echeanceDetail.dateCloture)}
                    ></Field>
                  ) : (
                    <p>
                      Fini le: {DateAPI.formatDate(echeanceDetail.dateCloture)}{" "}
                    </p>
                  )}
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
                <div className="col-12 border-detail mt-3">
                  <p className="mt-3">Entreprise en charge: </p>
                  <p>Effectif prévu: {echeanceDetail.effectifPrevu}</p>
                  {edit ? (
                    <Field
                      name="effectifConstate"
                      label="Effectif constaté"
                      type="text"
                      onChange={handleChangeEcheance}
                      value={echeanceDetail.effectifConstate}
                    ></Field>
                  ) : (
                    <p>Effectif constaté: {echeanceDetail.effectifConstate}</p>
                  )}
                </div>
              </div>
              {edit && (
                <Button className="btn btn-success" text="Valider"></Button>
              )}
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
