import React, { useEffect, useState } from "react";
import NavbarLeft from "../components/navbars/NavbarLeft";
import "../../css/report.css";
import { withRouter } from "react-router-dom";
import "../../css/app.css";
import ReportsAPI from "../services/ReportsAPI";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import Button from "../components/forms/Button";
import { Modal } from "react-bootstrap";
import Field from "../components/forms/Field";
import EcheanceAPI from "../services/EcheanceAPI";
import { toast } from "react-toastify";

const ReportEffectifsPage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const urlParams = match.params;

  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [echeance, setEcheance] = useState({});

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      console.log(data);
    } catch (error) {
      toast.error("Erreur lors du chargement du raport");
      console.log(error.response);
    }
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      console.log(data);
      setProject(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement du projet");
      console.log(error.respose);
    }
  };

  const fetchEcheance = async (id) => {
    try {
      const data = await EcheanceAPI.findEcheance(id);
      setEcheance(data);
    } catch (error) {
      toast.error("Erreur lors du chargement de l'échéance");
      console.log(error.repose);
    }
  };

  const handleShowModal = async (id) => {
    await fetchEcheance(id);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheance({ ...echeance, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(echeance);
      echeance.lot = "/api/lots/" + echeance.lot.id;
      await EcheanceAPI.update(echeance.id, echeance);
      toast.success("L'effectif est bien modifié !");
      handleCloseModal();
    } catch (error) {
      console.log(error.response);
    }
  };

  // Chargement du raport si besoin au cahrgement du composant ou au changement de l'identifiant
  useEffect(() => {
    fetchReport(urlParams.idReport);
    fetchProject(urlParams.id);
  }, [urlParams.idReport, urlParams.id]);

  return (
    <>
      <main>
        <NavbarLeftWithRouter selected="effectifs" />

        {!loading && (
          <>
            <div className="page-content">
              <h2>Effectifs : </h2>
              <h4>Rédacteur : {report.redacteur}</h4>
              <p>Date : {DateAPI.formatDate(report.dateRedaction)}</p>
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>N° Echéance</th>
                    <th>Entreprise</th>
                    <th>N°Lot</th>
                    <th>Sujet</th>
                    <th className="text-center">Effectif Prévu</th>
                    <th className="text-center">Effectif Constaté</th>
                  </tr>
                </thead>
                <tbody>
                  {project &&
                    project.lots.length !== 0 &&
                    project.lots.map((lot) => (
                      <React.Fragment key={lot.id}>
                        {lot.echeances.map((echeance) => (
                          <React.Fragment key={echeance.id}>
                            {echeance.report.includes(
                              "/api/reports/" + urlParams.idReport
                            ) && (
                              <tr key={echeance.id}>
                                <td>{echeance.numeroEcheance}</td>
                                <td>{lot.company.nom}</td>
                                <td>{lot.numeroLot}</td>
                                <td>{echeance.sujet}</td>
                                <td className="text-center">
                                  {echeance.effectifPrevu}
                                </td>
                                <td className="text-center">
                                  {echeance.effectifConstate}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-danger"
                                    text="Modifer"
                                    onClick={() => handleShowModal(echeance.id)}
                                  ></Button>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
              {project && project.lots.length === 0 && (
                <p>Il n'y a pas d'effectif défini pour ce rapport</p>
              )}
            </div>
          </>
        )}
        {loading && <div id="loading-icon"> </div>}
      </main>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <h2>Modifications des effectifs</h2>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <Field
              name="effectifPrevu"
              label="Effectif Prévu"
              onChange={handleChange}
              value={echeance.effectifPrevu}
            ></Field>
            <Field
              name="effectifConstate"
              label="Effectif constaté"
              onChange={handleChange}
              value={echeance.effectifConstate}
            ></Field>
            <Button
              className="btn btn-success align-self-end"
              text="valider"
            ></Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReportEffectifsPage;
