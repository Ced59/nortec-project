import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import DateAPI from "../services/DateAPI";
import Button from "../components/forms/Button";
import ReactPDF, { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import ReportPdfComponent from "../components/pdf/ReportPdfComponent";
import ReportsAPI from "../services/ReportsAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import PhotoAPI from "../services/PhotoAPI";
import ReportResume from "../components/ReportResume";
import SendPdfToAnnuaireModal from "../components/modal/SendPdfToAnnuaireModal";
import useIsMountedRef from "../components/UseIsMountedRef";
import { toast } from "react-toastify";
import AdminValidationModal from "../components/modal/AdminValidationModal";
import AuthAPI from "../services/AuthAPI";

const ReportValidatePage = ({ match }) => {
  const isMountedRef = useIsMountedRef();
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
      if (isMountedRef.current) {
        setReport(data);
        setReportLoading(false);
      }
    } catch (error) {
      console.log(error);
      console.log(error.respose);
    }
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      if (isMountedRef.current) {
        setProject(data);
        setLoading(false);
      }
    } catch (error) {}
  };

  const fetchPhotos = async () => {
    try {
      const data = await PhotoAPI.findByReport(urlParams.idReport);
      if (isMountedRef.current) {
        setPhotos(data);
        setPhotoLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProject(urlParams.id);
    fetchReport(urlParams.idReport);
    fetchPhotos();
  }, [urlParams.id, urlParams.idReport]);

  const handleChangeStatus = async ({ currentTarget }) => {
    const reportStatus = { status: currentTarget.name };
    console.log(reportStatus);
    try {
      await ReportsAPI.update(report.id, reportStatus);
      toast.success("Le satus du rapport à bien été modifié");
      fetchReport(urlParams.idReport);
    } catch (error) {
      console.log(error);
      console.log(error.respose);
      toast.error(
        "Une erreur est survenue lors du changement de status du rapport"
      );
    }
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
                    project.name +
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
            {report.status === "in_progress" && AuthAPI.isRole()==="Administrateur" && (
              <Button
                text="Valider"
                className="btn btn-primary mr-4"
                type="button"
                name="clotured"
                onClick={handleChangeStatus}
              />
            )}
            <SendPdfToAnnuaireModal
              lots={project.lots}
              users={project.users}
              projectName={project.name}
              reportChrono={report.chrono}
              project={project}
              report={report}
              photos={photos}
            />
            {report.status !== "sent" && report.status !== "clotured" && (
              <AdminValidationModal
                users={project.users}
                projectName={project.name}
                reportChrono={report.chrono}
                report={report}
                reportLink={
                  process.env.DOMAINE_URL+"#/project/" +
                  project.id +
                  "/" +
                  report.id +
                  "/validate"
                }
              />
            )}
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
