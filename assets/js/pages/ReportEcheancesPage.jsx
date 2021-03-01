import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import "../../css/app.css";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import { toast } from "react-toastify";
import AddEcheanceModal from "../components/modal/AddEcheanceModal";
import SpanStatusEcheance from "../components/span/SpanStatusEcheance";
import ReportsAPI from "../services/ReportsAPI";
import useIsMountedRef from "../components/UseIsMountedRef";
import EcheanceDetailModal from "../components/modal/EcheanceDetailModal";

const ReportEcheancesPage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const urlParams = match.params;
  const isMountedRef = useIsMountedRef();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({});
  const echeanceErrorModel = useState(echeanceError);
  const [echeanceError, setEcheanceError] = useState({
    numeroEcheance: "",
    categorie: "",
    sujet: "",
    dateDebut: "",
    effectifPrevu: "",
    effectifConstate: "",
    lot: "",
  });

  // ----------------------------------------------------FETCH FUNCTIONS-------------------------------------------------

  const fetchLots = async (id) => {
    try {
      const data = await ProjectsAPI.getLots(id);
      if (isMountedRef.current) {
        setLots(data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement des lots");
      console.log(error.response);
    }
  };

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      if (isMountedRef.current) {
        setReport(data);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement du projet");
    }
  };

  useEffect(() => {
    fetchReport(urlParams.idReport);
    fetchLots(urlParams.id);
  }, [urlParams.idReport, urlParams.id]);

  // --------------------------------------------------------TEMPLATE--------------------------------------------------

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
                    <th>Zone</th>
                    <th>Sujet</th>
                    <th>Statut</th>
                    <th>Début</th>
                    <th>Echéance</th>
                    <th>Clotûre</th>
                    <th>Retard</th>
                    <th>En charge</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map((lot) => (
                    <React.Fragment key={lot.id}>
                      {lot.echeances.map((echeance) => (
                        <React.Fragment key={echeance.id}>
                          {echeance.report.includes(
                            "/api/reports/" + urlParams.idReport
                          ) && (
                            <tr>
                              <td>{echeance.zone}</td>
                              <td>{echeance.sujet}</td>
                              <td>
                                <SpanStatusEcheance
                                  objet={echeance}
                                  dateReport={report.dateRedaction}
                                ></SpanStatusEcheance>
                              </td>
                              <td>{DateAPI.formatDate(echeance.dateDebut)}</td>
                              <td>
                                {DateAPI.formatDate(echeance.dateFinPrevue)}
                              </td>
                              <td>
                                {DateAPI.formatDate(echeance.dateCloture)}
                              </td>
                              <td>
                                {DateAPI.retard(
                                  echeance.dateCloture,
                                  echeance.dateFinPrevue,
                                  report.dateRedaction
                                ) > 0 &&
                                  DateAPI.retard(
                                    echeance.dateCloture,
                                    echeance.dateFinPrevue,
                                    report.dateRedaction
                                  )}
                              </td>
                              <td>{lot.company.nom}</td>
                              <td>
                                  <EcheanceDetailModal
                                    echeanceError={echeanceError}
                                    setEcheanceError={setEcheanceError}
                                    echeanceErrorModel={echeanceErrorModel}
                                    report={report}
                                    fetchLots={fetchLots}
                                    urlParams={urlParams}
                                    echeanceId={echeance.id}
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
              <AddEcheanceModal
                lots={lots}
                loading={loading}
                echeanceError={echeanceError}
                setEcheanceError={setEcheanceError}
                echeanceErrorModel={echeanceErrorModel}
                fetchLots={fetchLots}
                urlParams={urlParams}
              ></AddEcheanceModal>
            </div>
          </>
        )}
      </main>
      {loading && <div id="loading-icon"> </div>}
    </>
  );
};

export default ReportEcheancesPage;
