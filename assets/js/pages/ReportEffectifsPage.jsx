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
import useIsMountedRef from "../components/UseIsMountedRef";

const ReportEffectifsPage = ({ match }) => {
  const isMountedRef = useIsMountedRef();
  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const urlParams = match.params;
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [lots, setLots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [echeance, setEcheance] = useState({});

  // ----------------------------------------------------FETCH FUNCTIONS-------------------------------------------------

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      if (isMountedRef.current) {
        setReport(data);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement du rapport");
      console.log(error.response);
    }
  };

  const fetchLots = async (id) => {
    try {
      const data = await ProjectsAPI.getLots(id);
      if (isMountedRef.current) {
        setLots(data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement des lots");
      console.log(error.respose);
    }
  };

  const fetchEcheance = async (id) => {
    try {
      const data = await EcheanceAPI.findEcheance(id);
      if (isMountedRef.current) {
        setEcheance(data);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement de l'échéance");
      console.log(error.repose);
    }
  };

  useEffect(() => {
    fetchReport(urlParams.idReport);
    fetchLots(urlParams.id);
  }, [urlParams.idReport, urlParams.id]);

  // ----------------------------------------------------GESTION D'ETAT-------------------------------------------------

  const handleShowModal = async (id) => {
    await fetchEcheance(id);
    setShowModal(true);
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheance({ ...echeance, [name]: value });
  };

  // ---------------------------------------------------GESTION SUBMIT--------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      echeance.lot = "/api/lots/" + echeance.lot.id;
      await EcheanceAPI.update(echeance.id, echeance);
      toast.success("L'effectif est bien modifié !");
      setShowModal(false);
      fetchLots(urlParams.id);
    } catch (error) {
      console.log(error.response);
    }
  };

  // ------------------------------------------------------TEMPLATE-------------------------------------------------------------

  return (
    <>
      <main>
        <NavbarLeftWithRouter selected="effectifs" />

        {!loading && (
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
                  {lots.map((lot) => (
                      <React.Fragment key={lot.id}>
                        {lot.echeances && lot.echeances.map((echeance) => (
                          <React.Fragment key={echeance.id}>
                            {echeance.report.includes(
                              "/api/reports/" + urlParams.idReport
                            ) && (
                              <tr key={echeance.id}>
                                <td>{echeance.id}</td>
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
                                      type="button"
                                    className="btn btn-danger"
                                    text="Modifer"
                                    onClick={() => handleShowModal(echeance.id)}
                                  />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
              {lots.length === 0 && (
                <p>Il n'y a pas d'effectif défini pour ce rapport</p>
              )}
            </div>
        )}
        {loading && <div id="loading-icon"> </div>}
      </main>
      {/* ---------------------------------------------------MODAL---------------------------------------- */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={()=>setShowModal(false)}
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
            />
            <Field
              name="effectifConstate"
              label="Effectif constaté"
              onChange={handleChange}
              value={echeance.effectifConstate}
            />
            <Button
              className="btn btn-success align-self-end"
              text="valider"
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReportEffectifsPage;
