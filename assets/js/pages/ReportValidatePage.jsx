import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import DateAPI from "../services/DateAPI";
import Button from "../components/forms/Button";
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReportPdfComponent from "../components/pdf/ReportPdfComponent";
import ReportsAPI from "../services/ReportsAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import {
  statusEcheanceLabel,
  statusEcheanceClasses,
} from "../components/ProjectStatus";
import PhotoAPI from "../services/PhotoAPI";

const ReportValidatePage = ({ match }) => {
  const urlParams = match.params;
  const [report, setReport] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      setReportLoading(false);
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
      console.log(error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const data = await PhotoAPI.findByReport(urlParams.idReport);
      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject(urlParams.id);
    fetchReport(urlParams.idReport);
    fetchPhotos();
  }, [urlParams.id, urlParams.idReport]);

  console.log(match);

  //TODO à mettre dans un script node?
  const handleSavePDF = async () => {
    await ReactPDF.render(
      <ReportPdfComponent report={report} />,
      "../reportPDF/projet" + report.project.id + "rapport" + report.id + ".pdf"
    );
  };

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="validate" />
      {!loading && !reportLoading && (
        <div className="page-content">
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
                <p className="ml-3">{report.propreteSecurityComment}</p>
                <h6>
                  Commentaire interne (non visible sur le rapport final):{" "}
                </h6>
                <p className="ml-3">{report.propreteSecurityCommentIntern}</p>
                <h6>Photos : </h6>
                <div className="d-flex justify-content-around">
                  {photos.map((photo) => (
                    <React.Fragment key={photo.id}>
                      {photo.type === "security" && (
                        <img
                          
                          className="col-5"
                          src={photo.link}
                          alt=""
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
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
                <p className="ml-3">{report.propreteCommuneComment}</p>
                <h6>
                  Commentaire interne (non visible sur le rapport final):{" "}
                </h6>
                <p className="ml-3">{report.propreteCommuneCommentIntern}</p>
              </>
            )}
          </div>
          <div className="card m-4 p-2">
            <h4 className="mb-3">Liste des echeances</h4>
            {project.lots.map((lot) => (
              <React.Fragment key={lot.id}>
                {lot.echeances.length !== 0 &&
                  lot.echeances.some((echeance) =>
                    echeance.report.includes(
                      "/api/reports/" + urlParams.idReport
                    )
                  ) && (
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
                            <React.Fragment key={echeance.id}>
                              {echeance.report.includes(
                                "/api/reports/" + urlParams.idReport
                              ) && (
                                <tr key={echeance.id}>
                                  <td>
                                    {DateAPI.formatDate(echeance.dateDebut)}
                                  </td>
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
                              )}
                            </React.Fragment>
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
                className="offset-2 col-8"
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
          <div>
            <PDFViewer className="offset-2 col-8" height="1000">
              <ReportPdfComponent report={report} project={project} />
            </PDFViewer>
          </div>

          <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
            <Button
              text="Valider"
              className="btn btn-primary mr-4"
              type="button"
              onClick={handleSavePDF}
            />
            <Button
              text="Clôturer et envoyer"
              className="btn btn-primary mr-4"
              type="button"
            />
            <Button
              text="Faire valider par Admin"
              className="btn btn-primary mr-4"
              type="button"
            />
            <Link
              className="btn btn-primary"
              type="button"
              to={"/project/" + urlParams.id}
            >
              Retour au projet
            </Link>
          </div>
        </div>
      )}
      {loading && reportLoading && <div id="loading-icon"/>}
    </main>
  );
};

export default ReportValidatePage;
