import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import ImageUpload from "../components/forms/ImageUpload";
import "../../css/app.css";
import { toast } from "react-toastify";
import ReportsAPI from "../services/ReportsAPI";
import ReportImputation from "../components/ReportImputation";
import ReportComment from "../components/ReportComment";
import ReportConformity from "../components/ReportConformity";

const ReportPropreteAccesPage = ({ match }) => {
  const urlParams = match.params;
  const [conforme, setConforme] = useState("");
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
      console.log(data);
      setLoading(false);
      setTempImputations([]);
      setImputations([]);
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
        console.log(imputations);
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
        console.log(imputations);
      }
      // ---------------------------------------------
    } catch (error) {
      toast.error("Erreur lors du chargement du rapport");
      console.log(error.response);
    }
  };
  console.log(report);

  useEffect(() => {
    fetchReport(urlParams.idReport);
  }, [urlParams.id, urlParams.idReport]);

  // -------------------------------------------------gestion conformité/commentaire------------------------------------------

  const handleCheckConformity = (etat) => {
    setConforme(etat);
  };

  const handleSubmitReport = async ({ currentTarget }) => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      if (currentTarget.name == "conformity") {
        console.log(conforme);
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
          <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
            <h2 className="mb-4">Propreté des accès :</h2>
            <Button
              onClick={() => handleCheckConformity("conform")}
              className="btn btn-success mb-4"
              text="Conforme"
              type="button"
            />

            <Button
              onClick={() => handleCheckConformity("noconform")}
              className="btn btn-danger ml-5 mb-4"
              text="Non Conforme"
              type="button"
            />
          </div>

          {conforme === "conform" && (
            <div className="card mt-3">
              <div className="row ml-2 d-flex justify-content-center mt-3">
                <h4 className="mb-4">Propreté des accès conforme ?</h4>
              </div>
              <div className="row ml-2 d-flex justify-content-center">
                <Button
                  onClick={handleSubmitReport}
                  className="btn btn-primary mb-4 row"
                  text="Confirmer"
                  type="button"
                  name="conformity"
                />
              </div>
            </div>
          )}
          {conforme === "prorata" && (
            <div className="card mt-3">
              <div className="row ml-2 d-flex justify-content-center mt-3">
                <h4 className="mb-4">Propreté des accès au prorata ?</h4>
              </div>
              <div className="row ml-2 d-flex justify-content-center">
                <Button
                  onClick={handleSubmitReport}
                  className="btn btn-primary mb-4 row"
                  text="Confirmer"
                  type="button"
                  name="conformity"
                />
              </div>
            </div>
          )}
          {conforme === "noconform" && (
            <>
              <Button
                onClick={() => handleCheckConformity("prorata")}
                className="btn btn-warning ml-5 mb-4"
                text="Prorata"
                type="button"
              />
              <div className="row">
                <ReportImputation
                  setLoading={setLoading}
                  setImputations={setImputations}
                  imputations={imputations}
                  editImput={editImput}
                  setEditImput={setEditImput}
                  fetchReport={fetchReport}
                  urlParams={urlParams}
                  api={"propreteAcces"}
                ></ReportImputation>
                <div className="col-4">
                  <ImageUpload buttonText="Choisir l'image" />
                </div>
              </div>
              <ReportComment
                setReport={setReport}
                report={report}
                valueComment={report.propreteAccessComment}
                nameComment="propreteAccessComment"
                valueCommentIntern={report.propreteAccessCommentIntern}
                nameCommentIntern="propreteAccessCommentIntern"
                handleSubmitComment={handleSubmitReport}
              ></ReportComment>
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
      {loading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ReportPropreteAccesPage;
