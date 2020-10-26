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
import fakeData from "../components/fakeDataForDev/fakeData";

const ReportEcheancesPage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const [showModalEcheance, setShowModalEcheance] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [echeance, setEcheance] = useState({
    numero: "",
    redacteur: "Charles",
    status: "",
    category: "",
    subject: "",
    dateDebut: "",
    dateFin: "",
    lotId: {
      id: "",
      entreprise: {
        nom: "",
      },
    },
  });
  const [report, setReport] = useState({});
  const [edit, setEdit] = useState(false);

  const STATUS_CLASSES = {
    no_start: "info",
    in_progress: "warning",
    finished: "success",
    late: "danger",
  };

  const STATUS_LABEL = {
    no_start: "Pas démarré",
    in_progress: "En cours",
    finished: "Fini",
    late: "En retard",
  };

  const handleShowModalEcheance = () => {
    setShowModalEcheance(true);
  };
  const handleShowModalDetail = (id) => {
    setShowModalDetail(true);
    try {
      const echeanceById = fakeData.echeanceById(id);
      setEcheance(echeanceById);
      console.log(echeance);
      console.log(numlot);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCloseModalEcheance = () => {
    setShowModalEcheance(false);
  };

  const handleCloseModalDetail = () => {
    setShowModalDetail(false);
    setEdit(false);
    setEcheance({
      numero: "",
      redacteur: "Charles",
      status: "",
      category: "",
      subject: "",
      dateDebut: "",
      dateFin: "",
      lotId: {
        id: "",
        numero: "",
        entreprise: {
          nom: "",
        },
      },
    });
  };

  const handleChangeEcheance = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheance({ ...echeance, [name]: value });
  };

  const urlParams = match.params;
  const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));
  const fetchReport = () => {
    setReport(reportById);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  console.log(reportById);
  console.log(echeance);
  return (
    <>
      <main>
        <NavbarLeftWithRouter selected="echeances" />

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
              {reportById.lots.map((lot) => (
                <>
                  {lot.echeances.map((echeance) => (
                    <tr key={echeance.id}>
                      <td>{echeance.id}</td>
                      <td>{echeance.redacteur}</td>
                      <td>
                        <span
                          className={
                            "badge badge-" + STATUS_CLASSES[echeance.status]
                          }
                        >
                          {STATUS_LABEL[echeance.status]}
                        </span>
                      </td>
                      <td>{echeance.category}</td>
                      <td>{echeance.subject}</td>
                      <td>{DateAPI.formatDate(echeance.dateDebut)}</td>
                      <td>{DateAPI.formatDate(echeance.dateFin)}</td>
                      <td>{DateAPI.formatDate(echeance.dateCloture)}</td>
                      <td>
                        {/* {DateAPI.retard(echeance.dateCloture, echeance.dateFin)} */}
                      </td>
                      <td>{lot.entreprise.nom}</td>
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
      </main>

      {/*-------------------- Fenêttre modal pour l'ajout d'une échéance ------------------------------*/}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalEcheance}
        onHide={handleCloseModalEcheance}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une échéance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Field
              name="category"
              label="Catégorie"
              onChange={handleChangeEcheance}
              value={echeance.category}
            ></Field>
            <Field
              name="subject"
              label="Sujet"
              onChange={handleChangeEcheance}
              value={echeance.subject}
            ></Field>
            <Field
              name="dateDebut"
              label="Date de début"
              type="date"
              onChange={handleChangeEcheance}
              value={echeance.dateDebut}
            ></Field>
            <Field
              name="dateFin"
              label="Date de fin prévue"
              type="date"
              onChange={handleChangeEcheance}
              value={DateAPI.formatDateForm(echeance.dateFin)}
            ></Field>
            <Select
              name="lot"
              onChange={handleChangeEcheance}
              value={echeance.lot}
            >
              <option>Selectionner un lot</option>
              <option value="Apple">Lot N° 7548 Peinture</option>
              <option value="IBM">Lot N° 4568 Moquette</option>
              <option value="Sony">Lot N° 3154 Plomberie</option>
            </Select>
            <Modal.Footer>
              <Button className="btn btn-primary" text="Ajouter" onClick={(e) =>{e.preventDefault()}}></Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/*-------------------- Fenêttre modal pour le detail des échéances ----------------------------*/}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalDetail}
        onHide={handleCloseModalDetail}
      >
        <Modal.Header>
          <h2>Detail de l'échéance N° {echeance.id}</h2>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="container d-flex  flex-wrap justify-content-around">
              <div className="col-12 d-flex justify-content-around border-detail">
                <p>Redacteur: {echeance.redacteur} </p>
                <p>N° Lot: {echeance.lotId.numero} </p>
              </div>
              <div className="col-5 mt-3 border-detail d-flex flex-column justify-content-center">
                <p>Categorie: {echeance.category} </p>
                <p>Sujet: {echeance.subject} </p>
                {edit ? (
                  <Select
                    name="status"
                    label="Statut:"
                    onChange={handleChangeEcheance}
                    value={echeance.status}
                  >
                    <option value="no_start">Pas démarré</option>
                    <option value="in_progress">En cours</option>
                    <option value="late">En retard</option>
                    <option value="finished">Fini</option>
                  </Select>
                ) : (
                  <p>Statut: {STATUS_LABEL[echeance.status]}</p>
                )}
              </div>
              <div className="col-5 mt-3 border-detail">
                <p className="mt-3">Debut: {echeance.dateDebut} </p>
                <p>Fin prévue: {echeance.dateFin} </p>
                {edit ? (
                  <Field
                    name="dateCloture"
                    label="Date de Cloture:"
                    type="date"
                    onChange={handleChangeEcheance}
                    value={DateAPI.formatDateForm(echeance.dateCloture)}
                  ></Field>
                ) : (
                  <p>Fini le: {echeance.dateCloture} </p>
                )}
                {/* {DateAPI.retard(echeance.dateCloture, echeance.dateFin) > 0 && (
                  <p>
                    Retard:{" "}
                    {DateAPI.retard(echeance.dateCloture, echeance.dateFin)}
                  </p>
                )} */}
              </div>
              <div className="col-12 border-detail mt-3">
                <p className="mt-3">
                  Entreprise en charge: {echeance.lotId.entreprise.nom}{" "}
                </p>
                <p>Effectif prévu: {echeance.effectifPrevu}</p>
                {edit ? (
                  <Field
                    name="effectifConstate"
                    label="Effectif constaté"
                    type="text"
                    onChange={handleChangeEcheance}
                    value={echeance.effectifConstate}
                  ></Field>
                ) : (
                  <p>Effectif constaté: {echeance.effectifConstate}</p>
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
              <Button
                className="btn btn-success"
                text="Valider"
                onClick={handleEdit}
              ></Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportEcheancesPage;
