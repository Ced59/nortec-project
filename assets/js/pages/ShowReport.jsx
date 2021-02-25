import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReportPdfComponent from "../components/pdf/ReportPdfComponent";
import ReportResume from "../components/ReportResume";
import DateAPI from "../services/DateAPI";
import PhotoAPI from "../services/PhotoAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import ReportsAPI from "../services/ReportsAPI";
import useIsMountedRef from "../components/UseIsMountedRef";

const ShowReport = ({ match }) => {
  const isMountedRef = useIsMountedRef();
  const reportId = match.params.id;
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [project, setProject] = useState({});
  const [photos, setPhotos] = useState([]);

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      isMountedRef.current && setReport(data);
      fetchPhotos();
      fetchProject(data.Project.id).then(() => {
        isMountedRef.current && setLoading(false);
      });
    } catch (error) {
      toast.error("Une erreur dans le chargement du rapport");
    }
  };
  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      if (isMountedRef.current) {
        setProject(data);
        setReportLoading(false);
      }
    } catch (error) {
      toast.error("Une erreur dans le chargement du projet");
    }
  };
  const fetchPhotos = async () => {
    try {
      const data = await PhotoAPI.findByReport(reportId);
      if (isMountedRef.current) {
        setPhotos(data);
        setPhotoLoading(false);
      }
    } catch (error) {
      toast.error("Une erreur dans le chargement des photos");
    }
  };

  useEffect(() => {
    fetchReport(reportId);
  }, [reportId]);
  return (
    <main className="container">
      {!loading && !reportLoading && (
        <div>
          <Link
            className="btn btn-danger"
            to={"/project/" + project.id + "/listReports"}
          >
            Retour
          </Link>
          <ReportResume
            project={project}
            report={report}
            photos={photos}
            reportLoading={reportLoading}
            reportId={reportId}
          />

          {!reportLoading && !photoLoading && (
            <div>
              <PDFDownloadLink
                className="col-2 offset-5 mb-5 btn btn-primary"
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
          )}
        </div>
      )}
      {loading && reportLoading && <div id="loading-icon"/>}
    </main>
  );
};

export default ShowReport;
