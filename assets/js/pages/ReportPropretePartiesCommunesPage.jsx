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
import ImputationTitle from "../components/wrapper/ImputationTitle";

const ReportPropretePartiesCommunesPage = ({ match }) => {
  const [conforme, setConforme] = useState(false);
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [imputations, setImputations] = useState("");
  const [tempImputations, setTempImputations] = useState([]);
  const [editImput, setEditImput] = useState();
  const urlParams = match.params;
  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  // -------------------------------------------------function-------------------------------------------------------

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      setLoading(false);
      setTempImputations([]);
      setImputations([]);
      setConforme(data.propreteCommuneConformity);
      // --------------set imputations-------------
      if (data.propreteCommuneImputations == 0) {
        setEditImput(false);
        data.Project.lots.map((imput) =>
          tempImputations.push({
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            commentaire: "",
            percent: 0,
          })
        );
        setImputations(tempImputations);
      } else {
        setEditImput(true);
        data.propreteCommuneImputations.map((imput) =>
          tempImputations.push({
            idImput: imput.id,
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            commentaire: imput.commentaire,
            percent: imput.percent,
          })
        );
        setImputations(tempImputations);
      }
      // ---------------------------------------------
    } catch (error) {
      toast.error("Erreur lors du chargement du rapport");
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchReport(urlParams.idReport);
  }, [urlParams.id, urlParams.idReport]);

  // -------------------------------------------------gestion conformité/commentaire------------------------------------------

  const handleSubmitConformity = async () => {
    const reportConformity = { propreteCommuneConformity: conforme };
    try {
      await ReportsAPI.update(urlParams.idReport, reportConformity);
      toast.success(
        "Statut de la propreté des parties communes enregistrée avec succès!"
      );
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
      <NavbarLeftWithRouter selected="propetepartiecommune" />
      {!loading && (
        <div className="page-content">
          <ImputationTitle title={"Propreté parties communes :"}>
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
          </ImputationTitle>

          {conforme && (
            <CardConformity
              titre="Propreté des parties communes conforme ?"
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
                api={"propreteCommun"}
              />
              <ReportAddPhoto
                reportID={urlParams.idReport}
                typePhoto="commune"
              />
              <ReportComment
                setReport={setReport}
                report={report}
                valueComment={report.propreteCommuneComment}
                nameComment="propreteCommuneComment"
                valueCommentIntern={report.propreteCommuneCommentIntern}
                nameCommentIntern="propreteCommuneCommentIntern"
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
      )}
      {loading && <div id="loading-icon" />}
    </main>
  );
};

export default ReportPropretePartiesCommunesPage;
