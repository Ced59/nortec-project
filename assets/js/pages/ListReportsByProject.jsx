import React, { useEffect, useState } from "react";
import ReportsAPI from "../services/ReportsAPI";
import '../../css/app.css';
import DateAPI from '../services/DateAPI';

const STATUS_REPORT_LABELS = {
  clotured: "Clôturé non envoyé",
  in_progress: "En cours de rédaction",
  sent: "Clôturé envoyé",
  validating: "En attente de validation",
};

const ListReportsByProject = ({ match, history }) => {
  const id = match.params;
  const [listReport, setListReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await ReportsAPI.findAll();
      const idProject = parseInt(id.id, 10);
      const reportsByProject = data.filter((r) => r.Project.id === idProject);
      setListReport(reportsByProject);
      setLoading(false)
    } catch (error) {
      console.log(error.response);
    }
  };

  const formatDate = (str) => moment(str).format("LLLL");

  useEffect(() => {
    fetchReports(id);
  }, [id]);

  const handleShow = (id) => {
    history.push("/showReport/" + id);
  };

  const handleEdit = (idReport) => {
    history.push("/project/" + id.id + "/" + idReport + "/echeances");
    //TODO Envoi sur même route que création des rapports prévoir mode edition
  };

  const handleReturn = () => {
    history.push("/project/" + id.id);
  };

  return (
    <main className="container">
      {!loading && (
        <>
          {listReport.length !== 0 ? (
            <h2 className="mb-4">
              Liste des rapports pour le projet {listReport[0].Project.name}
            </h2>
          ) : (
            <h2>Il n'y a pas de rapport pour ce projet</h2>
          )}

          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Rapport n°</th>
                <th>Rédacteur</th>
                <th>Date de création</th>
                <th>Statut</th>
                <th></th>
                <th></th>
                <th />
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
                    <button
                      onClick={() => handleEdit(report.id)}
                      className="btn btn-sm btn-info"
                    >
                      Editer
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => handleShow(report.id)}
                      className="btn btn-sm btn-success"
                    >
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => handleReturn()}
            className="btn btn-sm btn-success"
          >
            Revenir au projet
          </button>
        </>
      )}
      {loading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ListReportsByProject;
