import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import "../../css/app.css";
import { toast } from "react-toastify";
import ReportsAPI from "../services/ReportsAPI";
import ReportImputation from "../components/ReportImputation";
import ReportComment from "../components/ReportComment";
import ReportAddPhoto from "../components/ReportAddPhoto";
import CardConformity from "../components/CardConformity";

const ReportSecuritePage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const [conforme, setConforme] = useState(false);
  const [imputations, setImputations] = useState([]);
  const [tempImputations, setTempImputations] = useState([]);
  const [editImput, setEditImput] = useState();
  const urlParams = match.params;
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------function------------------------------------------------------

  const fetchReport = async (id) => {
    setTempImputations([]);
    setImputations([]);
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      setLoading(false);
      setConforme(data.securityConformity);
      // --------------set imputations-------------
      if (data.securityCommentImputations == 0) {
        setEditImput(false);
        data.Project.lots.map((imput) =>
          tempImputations.push({
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            commentaire: "",
          })
        );
        setImputations(tempImputations);
      } else {
        setEditImput(true);
        data.securityCommentImputations.map((imput) =>
          tempImputations.push({
            idImput: imput.id,
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            commentaire: imput.commentaire,
          })
        );
        setImputations(tempImputations);
      }
      // ---------------------------------------------
    } catch (error) {
      toast.error("Erreur lors du chargement du rapport");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport(urlParams.idReport);
  }, [urlParams.id, urlParams.idReport]);

  // -------------------------------------------------gestion conformité/commentaire------------------------------------------

  const handleSubmitConformity = async () => {
    const reportConformity = { securityConformity: conforme };
    try {
      await ReportsAPI.update(urlParams.idReport, reportConformity);
      toast.success("Statut de la sécurité enregistrée avec succès!");
      fetchReport(urlParams.idReport);
    } catch (e) {
      console.log(e);
      console.log(e.response);
      toast.error(
        "Une erreur est survenue lors de la mise à jour de la conformité"
      );
    }
  };

  // --------------------------------------------------template--------------------------------------------

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="securite" />
      {!loading && (
        <>
          <div className="page-content">
            <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
              <h2 className="mb-4">Sécurité :</h2>
              <Button
                onClick={() => setConforme(true)}
                className="btn btn-success mb-4"
                text="Conforme"
                type="button"
              />
              <Button
                onClick={() => setConforme(false)}
                className="btn btn-danger ml-5 mb-4"
                text="Non Conforme"
                type="button"
              />
            </div>

            {conforme && (
              <CardConformity
                titre="Sécurité conforme ?"
                submit={handleSubmitConformity}
              />
            )}
            {conforme === false && (
              <>
                <ReportImputation
                  setLoading={setLoading}
                  setImputations={setImputations}
                  setTempImputations={setTempImputations}
                  imputations={imputations}
                  editImput={editImput}
                  setEditImput={setEditImput}
                  fetchReport={fetchReport}
                  urlParams={urlParams}
                  api={"securite"}
                />
                <div className="ml-auto">
                  <ReportAddPhoto
                    reportID={urlParams.idReport}
                    typePhoto="security"
                  />
                </div>
                <ReportComment
                  setReport={setReport}
                  report={report}
                  valueComment={report.securityConmment}
                  nameComment="securityConmment"
                  valueCommentIntern={report.securityConmmentIntern}
                  nameCommentIntern="securityConmmentIntern"
                  fetchReport={fetchReport}
                  idReport={urlParams.idReport}
                />
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={handleSubmitConformity}
                    className="btn btn-primary"
                    text="Confirmer"
                    type="button"
                    name="conformity"
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
      {loading && <div id="loading-icon" />}
    </main>
  );
};

export default ReportSecuritePage;
