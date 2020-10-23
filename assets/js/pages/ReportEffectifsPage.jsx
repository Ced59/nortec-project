import React, { useEffect, useState } from "react";
import NavbarLeft from "../components/navbars/NavbarLeft";
import "../../css/report.css";
import { withRouter } from "react-router-dom";
import "../../css/app.css";
import ReportsAPI from "../services/ReportsAPI";
import DateAPI from "../services/DateAPI";

const ReportEffectifsPage = ({ match }) => {

  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const urlParams = match.params;

  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Chargement du customer si besoin au cahrgement du composant ou au changement de l'identifiant
  useEffect(() => {
    fetchReport(urlParams.idReport);
  }, [urlParams.idReport]);

  return (
    <main>
      <NavbarLeftWithRouter selected="effectifs" />

      {!loading && (
        <>
        <div className="page-content">
          <h2>Effectifs : </h2>
          <h4>Rédacteur : {report.redacteur}</h4>
          <p>Date : {DateAPI.formatDate(report.dateRedaction)}</p>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>N°</th>
                <th>Entreprise</th>
                <th>N°Lot</th>
                <th>Nom Lot</th>
                <th className="text-center">Effectif Prévu</th>
                <th className="text-center">Effectif Constaté</th>
              </tr>
            </thead>
            <tbody>
              {report &&
                report.lots.length !== 0 &&
                report.lots.map((lot) => (
                  <tr key={lot.id}>
                    <td>{lot.id}</td>
                    <td>{lot.company.nom}</td>
                    <td>{lot.numeroLot}</td>
                    <td>{lot.libelleLot}</td>
                    <td className="text-center">{lot.effectifPrevu}</td>
                    <td className="text-center">{lot.effectifConstate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {report && report.lots.length === 0 && (
            <p>Il n'y a pas d'effectif défini pour ce rapport</p>
          )}
        </div>
        </>
      )}
      {loading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ReportEffectifsPage;
