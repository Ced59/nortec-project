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

const ShowReport = ({ match }) => {
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
      setReport(data);
      fetchPhotos();
      fetchProject(data.Project.id).then(() => {
        setLoading(false);
      });
    } catch (error) {
      toast.error("Une erreur dans le chargement du rapport")
    }
  };
  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      setProject(data);
      setReportLoading(false);
    } catch (error) {
      toast.error("Une erreur dans le chargement du rapport")
    }
  };
  const fetchPhotos = async () => {
    try {
      const data = await PhotoAPI.findByReport(reportId);
      setPhotos(data);
      setPhotoLoading(false);
    } catch (error) {
      toast.error("Une erreur dans le chargement du rapport")
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
            type="button"
            to={"/project/" + report.Project.id + "/listReports"}
          >
            {" "}
            Retour{" "}
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
                  <ReportPdfComponent report={report} project={project} photos={photos} />
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
