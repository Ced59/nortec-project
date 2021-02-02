import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportPdfComponent from "../components/pdf/ReportPdfComponent";
import {
  statusEcheanceClasses,
  statusEcheanceLabel,
} from "../components/ProjectStatus";
import DateAPI from "../services/DateAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import ReportsAPI from "../services/ReportsAPI";

const ShowReport = ({ match }) => {
  const reportId = match.params.id;

  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [project, setProject] = useState({});

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      console.log(data);
      setReport(data);
      fetchProject(data.Project.id).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      console.log(data);
      setProject(data);

      setReportLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport(reportId);
  }, [reportId]);
  return (
    <main className="container">
      {!loading && !reportLoading && (
        <div>
      <Link className="btn btn-danger" type="button" to={"/project/" + report.Project.id+"/listReports"}>
        {" "}
        Retour{" "}
      </Link>
          <h3>
            Résumé du rapport du {DateAPI.formatDateHours(report.dateRedaction)}{" "}
            :
          </h3>

          <div className="card m-4 p-2">
            <h5 className="mt-3">
              <span style={{ fontWeight: "bold" }}>Projet :</span>{" "}
              {project.name}
            </h5>
            <p className="mt-3">
              <span style={{ fontWeight: "bold" }}>Description : </span>{" "}
              {project.description}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Adresse 1 : </span>{" "}
              {project.adresse1}
            </p>
            {project.adresse2 && (
              <p>
                <span style={{ fontWeight: "bold" }}>Adresse 2 : </span>{" "}
                {project.adresse2}
              </p>
            )}
            <p>
              <span style={{ fontWeight: "bold" }}>Code Postal : </span>{" "}
              {project.codePostal}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Ville : </span>{" "}
              {project.ville}
            </p>
          </div>

          <div className="card m-4 p-2">
            <h4 className="mb-3">Liste des Lots</h4>

            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>
                    <p>Entreprises</p>
                    <p>Lots</p>
                  </th>
                  <th>
                    <p>Adresse Postale</p>
                  </th>
                  <th colSpan="3" className="text-center">
                    <p>Interlocuteur execution</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.lots.map((lot) => (
                  <tr key={lot.id}>
                    <td>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          {lot.company.nom}
                        </span>{" "}
                      </p>
                      <p>{lot.libelleLot}</p>
                    </td>
                    <td>
                      <p>{lot.company.adresse1}</p>{" "}
                      <p>
                        {lot.company.codePostal} {lot.company.ville}
                      </p>
                    </td>
                    <td>
                      {lot.company.annuaires.map((annuaire, i) => (
                        <p key={i}>{annuaire.nom}</p>
                      ))}
                    </td>
                    <td>
                      {lot.company.annuaires.map((annuaire, i) => (
                        <p key={i}> {annuaire.email}</p>
                      ))}
                    </td>
                    <td>
                      {lot.company.annuaires.map((annuaire, i) => (
                        <p key={i}>{annuaire.telephone}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card m-4 p-2">
            {report.securityConformity ? (
              <h4>Sécurité conforme</h4>
            ) : (
              <>
                <h4 className="mb-3">Sécurité non conforme</h4>
                <ul>
                  {report.securityCommentImputations.map((imputation) => (
                    <div key={imputation.id}>
                      {imputation.commentaire && (
                        <li>
                          <h6>Entreprise : {imputation.company.nom}</h6>
                          <p className="ml-2">{imputation.commentaire}</p>
                        </li>
                      )}
                    </div>
                  ))}
                </ul>
                <h6>Commentaire : </h6>
                <p className="ml-3">{report.propreteAccessComment}</p>
                <h6>
                  Commentaire interne (non visible sur le rapport final):{" "}
                </h6>
                <p className="ml-3">{report.propreteAccessCommentIntern}</p>
              </>
            )}
          </div>
          <div className="card m-4 p-2">
            {report.propreteAccessConformity === "conform" && (
              <h4>Propreté des accès conforme</h4>
            )}
            {report.propreteAccessConformity === "prorata" && (
              <h4>Propreté des accès au prorata</h4>
            )}
            {report.propreteAccessConformity === "noconform" && (
              <>
                <h4 className="mb-3">Propreté des accès non conforme</h4>
                <ul>
                  {report.propreteAccessImputation.map((imputation) => (
                    <div key={imputation.id}>
                      {imputation.pourcent !== 0 && (
                        <li>
                          <h6>Entreprise : {imputation.company.nom}</h6>
                          <p className="ml-2">
                            {"Pourcentage imputation : " +
                              imputation.pourcent +
                              " %"}
                          </p>
                        </li>
                      )}
                    </div>
                  ))}
                </ul>
                <h6>Commentaire : </h6>
                <p className="ml-3">{report.propreteAccessComment}</p>
                <h6>
                  Commentaire interne (non visible sur le rapport final):{" "}
                </h6>
                <p className="ml-3">{report.propreteAccessCommentIntern}</p>
              </>
            )}
          </div>
          <div className="card m-4 p-2">
            {report.propreteCommuneConformity && (
              <h4>Propreté des parties communes conforme</h4>
            )}

            {!report.propreteCommuneConformity && (
              <>
                <h4 className="mb-3">
                  Propreté des parties communes non conforme
                </h4>
                {!reportLoading && (
                  <ul>
                    {report.propreteCommuneImputations.map((imputation) => (
                      <div key={imputation.id}>
                        {imputation.commentaire !== "" && (
                          <li>
                            <h6>Entreprise : {imputation.company.nom}</h6>
                            <p className="ml-2">
                              {"Pourcentage imputation : " +
                                imputation.percent +
                                " %"}
                            </p>
                            <p className="ml-2 mt-0">
                              {"Commentaire : " + imputation.commentaire}
                            </p>
                          </li>
                        )}
                      </div>
                    ))}
                  </ul>
                )}
                <h6>Commentaire : </h6>
                <p className="ml-3">{report.propreteAccessComment}</p>
                <h6>
                  Commentaire interne (non visible sur le rapport final):{" "}
                </h6>
                <p className="ml-3">{report.propreteAccessCommentIntern}</p>
              </>
            )}
          </div>
          <div className="card m-4 p-2">
            <h4 className="mb-3">Liste des echeances</h4>
            {project.lots.map((lot) => (
              <React.Fragment key={lot.id}>
                {lot.echeances.length !== 0 && (
                  <>
                    <div className="row justify-content-center">
                      <div className="mx-5">
                        Lot:{" "}
                        <h5>
                          {lot.numeroLot} {lot.libelleLot}
                        </h5>
                      </div>
                      <div className="mx-5">
                        Entreprise: <h5>{lot.company.nom}</h5>
                      </div>
                    </div>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Zone</th>
                          <th>Désignation</th>
                          <th>Pour le</th>
                          <th>Planning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lot.echeances.map((echeance) => (
                          <tr key={echeance.id}>
                            <td>{DateAPI.formatDate(echeance.dateDebut)}</td>
                            <td>{echeance.zone}</td>
                            <td>
                              <p>{echeance.sujet}</p>
                              <p>{echeance.comment}</p>
                            </td>
                            <td>
                              {DateAPI.formatDate(echeance.dateFinPrevue)}
                            </td>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <hr />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
          {!reportLoading && (
            <div>
              <PDFDownloadLink
                className="col-2 offset-5 mb-5 btn btn-primary"
                document={
                  <ReportPdfComponent report={report} project={project} />
                }
                fileName={
                  report.Project.name +
                  "_rapport_" +
                  report.chrono +
                  "_au_" +
                  DateAPI.formatDate(DateAPI.now()) +
                  ".pdf"
                }
              >
                {({ loading }) =>
                  loading
                    ? "PDF en préparation pour téléchargement..."
                    : "Télécharger le PDF"
                }
              </PDFDownloadLink>
            </div>
          )}
        </div>
      )}
      {loading && reportLoading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ShowReport;
