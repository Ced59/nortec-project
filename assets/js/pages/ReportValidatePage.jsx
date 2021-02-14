import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import DateAPI from "../services/DateAPI";
import Button from "../components/forms/Button";
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReportPdfComponent from "../components/pdf/ReportPdfComponent";
import ReportsAPI from "../services/ReportsAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import PhotoAPI from "../services/PhotoAPI";
import ReportResume from "../components/ReportResume";
import SendPdfToAnnuaireModal from "../components/modal/SendPdfToAnnuaireModal";

const ReportValidatePage = ({ match }) => {
  const urlParams = match.params;
  const [report, setReport] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      setReportLoading(false);
    } catch (error) {}
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      setProject(data);

      setLoading(false);
    } catch (error) {}
  };

  const fetchPhotos = async () => {
    try {
      const data = await PhotoAPI.findByReport(urlParams.idReport);
      setPhotos(data);
      setPhotoLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProject(urlParams.id);
    fetchReport(urlParams.idReport);
    fetchPhotos();
  }, [urlParams.id, urlParams.idReport]);

  //TODO à mettre dans un script node?
  const handleSavePDF = async () => {
    await ReactPDF.render(
      <ReportPdfComponent report={report} />,
      "../reportPDF/projet" + report.Project.id + "rapport" + report.id + ".pdf"
    );
  };

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="validate" />
      {!loading && !reportLoading && (
        <div className="page-content">
          <ReportResume
            project={project}
            report={report}
            photos={photos}
            reportLoading={reportLoading}
            reportId={urlParams.idReport}
          />
          {!reportLoading && !photoLoading && (
            <>
              <div>
                <PDFDownloadLink
                  className="offset-2 col-8"
                  document={
                    <ReportPdfComponent
                      report={report}
                      project={project}
                      photos={photos}
                    />
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
              <div>
                <PDFViewer className="offset-2 col-8" height="1000">
                  <ReportPdfComponent
                    report={report}
                    project={project}
                    photos={photos}
                  />
                </PDFViewer>
              </div>
            </>
          )}

          <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
            <Button
              text="Valider"
              className="btn btn-primary mr-4"
              type="button"
              onClick={handleSavePDF}
            />
            <SendPdfToAnnuaireModal lots={report.Project.lots} />
            {/* <Button
              text="Clôturer et envoyer"
              className="btn btn-primary mr-4"
              type="button"
            /> */}
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
      {loading && reportLoading && <div id="loading-icon" />}
    </main>
  );
};

export default ReportValidatePage;
