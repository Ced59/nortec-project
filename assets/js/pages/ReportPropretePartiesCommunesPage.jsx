import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import ImageUpload from "../components/forms/ImageUpload";
import "../../css/app.css";
import { toast } from "react-toastify";
import ReportsAPI from "../services/ReportsAPI";
import ReportImputation from "../components/ReportImputation";
import ReportComment from "../components/ReportComment";
import ReportAddPhoto from "../components/ReportAddPhoto";

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
      console.log(data);
      setLoading(false);
      setTempImputations([]);
      setImputations([]);
      setConforme(data.propreteCommuneConformity);
      // --------------set imputations-------------
      if (data.propreteCommuneImputations == 0) {
        setEditImput(false);
        console.log("new");
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
        console.log(imputations);
      } else {
        setEditImput(true);
        console.log("edit");
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
        console.log(imputations);
      }
      // ---------------------------------------------
    } catch (error) {
      toast.error("Erreur lors du chargement du raport");
      console.log(error.response);
    }
  };

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
        report.propreteCommuneConformity = conforme;
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

  // --------------------------------------------------template--------------------------------------------

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="propetepartiecommune" />
      {!loading && (
        <div className="page-content">
          <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
            <h2 className="mb-4">Propreté parties communes :</h2>
            <Button
              onClick={() => handleCheckConformity(true)}
              className="btn btn-success mb-4"
              text="Conforme"
              type="button"
            />
            <Button
              onClick={() => handleCheckConformity(false)}
              className="btn btn-danger ml-5 mb-4"
              text="Non Conforme"
              type="button"
            />
          </div>

          {conforme && (
            <div className="card mt-3">
              <div className="row ml-2 d-flex justify-content-center mt-3">
                <h4 className="mb-4">
                  Propreté des parties communes conforme ?
                </h4>
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
          {conforme === false && (
            <>
              <div className="row">
                <ReportImputation
                  setLoading={setLoading}
                  setImputations={setImputations}
                  imputations={imputations}
                  editImput={editImput}
                  setEditImput={setEditImput}
                  fetchReport={fetchReport}
                  urlParams={urlParams}
                  api={"propreteCommun"}
                ></ReportImputation>
              </div>
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

export default ReportPropretePartiesCommunesPage;
