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
import MediaUploadAPI from "../services/MediaUploadAPI";
import PhotoAPI from "../services/PhotoAPI";

const ReportSecuritePage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const [conforme, setConforme] = useState(false);
  const [imputations, setImputations] = useState([]);
  const [tempImputations, setTempImputations] = useState([]);
  const [editImput, setEditImput] = useState();
  const urlParams = match.params;
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [picture, setPicture] = useState([]);
  const [photo, setPhoto] = useState({
    Report: "",
    link: "",
    type: "jpeg",
  });

  const data = new FormData();
  data.append("file", picture[0]);

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

  //--------------------------------------------------gestion des photos------------------------------------------------------

  const onDrop = (picture) => {
    setPicture([...picture, picture]);
  };

  // -------------------------------------------------gestion conformité/commentaire------------------------------------------

  const handleCheckConformity = (etat) => {
    setConforme(etat);
  };

  const handleSubmitReport = async ({ currentTarget }) => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      if (currentTarget.name == "conformity") {
        report.securityConformity = conforme;
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
      await MediaUploadAPI.upload(data)
        .then((response) => {
          console.log(response.data);
          console.log(report.id.toString());
          photo.link = response.data.contentUrl;
          photo.Report = "/api/reports/" + report.id.toString();
          PhotoAPI.create(photo);
        })
        .catch(function () {
          console.log("FAILURE");
        });

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
      <NavbarLeftWithRouter selected="securite" />
      {!loading && (
        <>
          <div className="page-content">
            <div className="ml-2 mt-4 d-flex justify-content-between mb-3">
              <h2 className="mb-4">Sécurité :</h2>
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
                  <h4 className="mb-4">Sécurité conforme ?</h4>
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
                <div className="row col-12">
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
                  ></ReportImputation>
                  <div className="ml-auto">
                    <ImageUpload
                      buttonText="Choisir l'image"
                      singleImg={true}
                      onChange={onDrop}
                    />
                  </div>
                </div>
                <ReportComment
                  setReport={setReport}
                  report={report}
                  valueComment={report.securityConmment}
                  nameComment="securityConmment"
                  valueCommentIntern={report.securityConmmentIntern}
                  nameCommentIntern="securityConmmentIntern"
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
        </>
      )}
      {loading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ReportSecuritePage;
