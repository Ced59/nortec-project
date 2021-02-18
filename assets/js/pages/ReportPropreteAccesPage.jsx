import React, { useState, useEffect } from "react";
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

const ReportPropreteAccesPage = ({ match }) => {
  const urlParams = match.params;
  const [conforme, setConforme] = useState("noconform");
  const [tempImputations, setTempImputations] = useState([]);
  const [imputations, setImputations] = useState([]);
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [editImput, setEditImput] = useState();
  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  // -------------------------------------------------------function------------------------------------------------

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      setLoading(false);
      setTempImputations([]);
      setImputations([]);
      setConforme(data.propreteAccessConformity);
      // --------------set imputations-------------
      if (data.propreteAccessImputation == 0) {
        setEditImput(false);
        data.Project.lots.map((imput) =>
          tempImputations.push({
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            pourcent: 0,
          })
        );
        setImputations(tempImputations);
      } else {
        setEditImput(true);
        data.propreteAccessImputation.map((imput) =>
          tempImputations.push({
            idImput: imput.id,
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            pourcent: imput.pourcent,
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

  const handleSubmitReport = async ({ currentTarget }) => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      if (currentTarget.name == "conformity") {
        report.propreteAccessConformity = conforme;
      }
      report.securityCommentImputations = report.securityCommentImputations.map(
        (imput) => "/api/security_comment_imputations/" + imput.id
      );
      report.propreteAccessImputation = report.propreteAccessImputation.map(
        (imput) => "/api/proprete_access_imputations/" + imput.id
      );
      report.propreteCommuneImputations = report.propreteCommuneImputations.map(
        (imput) => "/api/proprete_commune_imputations/" + imput.id
      );

      await ReportsAPI.update(urlParams.idReport, report);
      if (currentTarget.name == "conformity") {
        toast.success(
          "Statut de la propreté des accès enregistré avec succès!"
        );
      } else {
        toast.success("Commentaires enregistré avec succès!");
      }
    } catch (error) {
      console.log(error.response);
    }
    fetchReport(urlParams.idReport);
  };

  // ----------------------------------------------------template-------------------------------------------------------------

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="proprete" />
      {!loading && (
        <div className="page-content">
          <ImputationTitle title={"Propreté des accès :"}>
            <Button
              onClick={() => setConforme("conform")}
              className="btn btn-success mb-4"
              text="Conforme"
              type="button"
            />

            <Button
              onClick={() => setConforme("noconform")}
              className="btn btn-danger ml-5 mb-4"
              text="Non Conforme"
              type="button"
            />
          </ImputationTitle>

          {conforme === "conform" && (
            <CardConformity
              titre="Propreté des accès conforme ?"
              submit={handleSubmitReport}
            />
          )}
          {conforme === "prorata" && (
            <CardConformity
              titre="Propreté des accès au prorata ?"
              submit={handleSubmitReport}
            />
          )}
          {conforme === "noconform" && (
            <>
              <Button
                onClick={() => setConforme("prorata")}
                className="btn btn-warning ml-5 mb-4"
                text="Prorata"
                type="button"
              />
              <ReportImputation
                setLoading={setLoading}
                setImputations={setImputations}
                setTempImputations={setTempImputations}
                imputations={imputations}
                editImput={editImput}
                setEditImput={setEditImput}
                fetchReport={fetchReport}
                urlParams={urlParams}
                api={"propreteAcces"}
              />
              <ReportAddPhoto
                reportID={urlParams.idReport}
                typePhoto="access"
              />
              <ReportComment
                setReport={setReport}
                report={report}
                valueComment={report.propreteAccessComment}
                nameComment="propreteAccessComment"
                valueCommentIntern={report.propreteAccessCommentIntern}
                nameCommentIntern="propreteAccessCommentIntern"
                handleSubmitComment={handleSubmitReport}
              />
              <div className="d-flex justify-content-center">
                <Button
                  onClick={handleSubmitReport}
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

export default ReportPropreteAccesPage;
