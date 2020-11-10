import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";
import Button from "../components/forms/Button";
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReportPdfComponent from "../components/pdf/ReportPdfComponent";
import ReportsAPI from "../services/ReportsAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import { statusEcheanceLabel } from "../components/ProjectStatus";

const ReportValidatePage = ({ match }) => {
  const urlParams = match.params;

  //   const [report, setReport] = useState(
  //     fakeData.reportById(parseInt(urlParams.idReport, 10))
  //   );
  const [report, setReport] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);

  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  // const fetchReport = () => {

  //     const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

  //     if (reportById) {
  //         setReport(reportById);
  //         console.log(reportById);
  //         console.log(report);
  //     }

  // };

  // useEffect(() => {

  //     fetchReport();

  // }, []);

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      console.log(data);
      setReport(data);
      setReportLoading(true);
    } catch (error) {
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject(urlParams.id);
    fetchReport(urlParams.idReport);
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
      {!loading && (
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
                  <th>Entreprise</th>
                  <th>N°Lot</th>
                  <th>Nom Lot</th>
                </tr>
              </thead>
              <tbody>
                {project.lots.map((lot) => (
                  <tr key={lot.id}>
                    <td style={{ fontWeight: "bold" }}>{lot.company.nom}</td>
                    <td>{lot.numeroLot}</td>
                    <td>{lot.libelleLot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card m-4 p-2">
            {report.securityConformity ? (
              <h5>Sécurité conforme</h5>
            ) : (
              <>
                <h4 className="mb-3">Sécurité non conforme</h4>
                {!reportLoading && (
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
                )}
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Rédacteur</th>
                  <th>Statut</th>
                  <th>Sujet</th>
                  <th>Début</th>
                  <th>Echéance</th>
                  <th>Clotûre</th>
                  <th>Retard</th>
                  <th>En charge</th>
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
                          <span>
                            {statusEcheanceLabel(
                              echeance.dateDebut,
                              echeance.dateCloture,
                              echeance.dateFinPrevue
                            )}
                          </span>
                        </td>
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
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div>
            <PDFDownloadLink
              className="offset-3 col-6"
              document={<ReportPdfComponent report={report} />}
              fileName={
                report.Project.name +
                "_rapport_" +
                report.id +
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
          </div> */}
          {/* <div>
            <PDFViewer className="offset-3 col-6" height="1000">
              <ReportPdfComponent report={report} />
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
          </div> */}
        </div>
      )}
      {loading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ReportValidatePage;
