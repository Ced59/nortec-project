import React, { useEffect, useState } from "react";
import "../../css/app.css";
import DateAPI from "../services/DateAPI";
import { Link } from "react-router-dom";
import useIsMountedRef from "../components/UseIsMountedRef";
import ProjectsAPI from "../services/ProjectsAPI";
import { STATUS_REPORT_LABELS } from "../components/ReportStatus";


const ListReportsByProject = ({ match }) => {
  const isMountedRef = useIsMountedRef();
  const id = match.params.id;
  const [listReport, setListReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await ProjectsAPI.getReports(id);
      if (isMountedRef.current) {
        setListReport(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchReports(id);
  }, [id]);

  // ------------------------------------------------------TEMPLATE--------------------------------------------------------

  return (
    <main className="container">
      {loading ? (
        <div id="loading-icon" />
      ) : (
        <>
          <h2 className="mb-4">
            {listReport.length !== 0
              ? "Liste des rapports pour le projet " +
                listReport[0].Project.name
              : "Il n'y a pas de rapport pour ce projet"}
          </h2>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Rapport n°</th>
                <th>Rédacteur</th>
                <th>Date de création</th>
                <th>Statut</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listReport.map((report) => (
                <tr key={report.id}>
                  <td>{report.chrono}</td>
                  <td>{report.redacteur}</td>
                  <td>{DateAPI.formatDate(report.dateRedaction)}</td>
                  <td>{STATUS_REPORT_LABELS[report.status]}</td>

                  <td>
                    <Link
                      to={"/project/" + id + "/" + report.id + "/echeances"}
                      className="btn btn-sm btn-info"
                    >
                      Editer
                    </Link>
                  </td>

                  <td>
                    <Link
                      to={"/showReport/" + report.id}
                      className="btn btn-sm btn-success"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to={"/project/" + id} className="btn btn-sm btn-success">
            Revenir au projet
          </Link>
        </>
      )}
    </main>
  );
};

export default ListReportsByProject;
