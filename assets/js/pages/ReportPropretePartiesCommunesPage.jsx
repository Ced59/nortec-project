import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import fakeData from "../components/fakeDataForDev/fakeData";
import "../../css/app.css";
import { toast } from "react-toastify";
import ProjectsAPI from "../services/ProjectsAPI";
import ReportsAPI from "../services/ReportsAPI";
import ReportComment from "../components/ReportComment";

const ReportPropretePartiesCommunesPage = ({ match }) => {
  const [conforme, setConforme] = useState(null);
  const [comment, setComment] = useState("");
  const [commentIntern, setCommentIntern] = useState("");
  const [project, setProject] = useState({});
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [imputation, setImputation] = useState({
    commentaire: "",
    pourcent: "",
  });

  const [imputations, setImputations] = useState("");
  const [percentImputations, setPercentImputations] = useState([]);

  const urlParams = match.params;
  //   const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  //   const fetchReport = () => {
  //     //Vérification si édition ou nouveau rapport... Dans la version finale, le nouveau rapport existera mais avec valeurs vides donc pas de vérification à ce niveau
  //     if (reportById) {
  //       setConforme(reportById.propreteCommuneConformity);
  //       setComment(reportById.propreteCommuneComment);
  //       setCommentIntern(reportById.propreteCommuneCommentIntern);
  //       setImputations(reportById.proprete_commune_imputation);
  //       setPercentImputations(reportById.proprete_commune_imputation);
  //     }
  //   };

  const fetchReport = async (id) => {
    try {
      const data = await ReportsAPI.findReport(id);
      setReport(data);
      console.log(data);
    } catch (error) {
      toast.error("Erreur lors du chargement du raport");
      console.log(error.response);
    }
  };

  const fetchProject = async (id) => {
    try {
      const data = await ProjectsAPI.find(id);
      setProject(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement du projet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject(urlParams.id);
    fetchReport(urlParams.idReport);
  }, [urlParams.id, urlParams.idReport]);

  const handleCheckConforme = () => {
    if (!conforme || conforme === false) {
      setConforme(true);
    }
  };

  //   const handleChangeImputations = ({ currentTarget }) => {
  //     console.log(currentTarget.id);

  //     console.log(currentTarget.value);

  //     const imputs = imputations;
  //     imputs[currentTarget.id].pourcent = parseInt(currentTarget.value, 10);

  //     setImputations("");
  //     setImputations(imputs);

  //     console.log(imputations);
  //   };

  const handleChangeImputations = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setImputation({ ...imputation, [name]: value });
    console.log(currentTarget);
  };

  //   const handleChangePercentImputations = ({ currentTarget }) => {
  //     console.log(currentTarget.id);

  //     console.log(currentTarget.value);

  //     const imputs = percentImputations;
  //     imputs[currentTarget.id].pourcent = parseInt(currentTarget.value, 10);

  //     setPercentImputations("");
  //     setPercentImputations(imputs);

  //     console.log(imputations);
  //   };

  const handleCheckNonConforme = () => {
    if (conforme || conforme === null) {
      setConforme(false);
    }
  };

  const handleSubmit = () => {};

  const handleSubmitConform = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.propreteCommuneConformity = true;
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitNonConforme = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.propreteCommuneConformity = false;
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };



  return (
    <main className="container">
      <NavbarLeftWithRouter selected="propetepartiecommune" />
      {!loading && (
        <div className="page-content">
          <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
            <h2 className="mb-4">Propreté parties communes :</h2>
            <Button
              onClick={handleCheckConforme}
              className="btn btn-success mb-4"
              text="Conforme"
              type="button"
            />
            <Button
              onClick={handleCheckNonConforme}
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
                  onClick={handleSubmitConform}
                  className="btn btn-info mb-4 row"
                  text="Valider"
                  type="button"
                />
              </div>
            </div>
          )}
          {conforme === false && (
            <>
              <div className="row">
                <div>
                  <form>
                    <div className="col-12">
                      {project.lots.map((lot) => (
                        <div
                          className="row d-flex flex-row align-items-center"
                          key={lot.id}
                        >
                          <h5 className="col-5">{lot.company.nom}</h5>

                          <FieldTextArea
                            value={imputation.commentaire}
                            className="form-control col-6 mb-1 mr-1"
                            name={"name" + imputation.company}
                            onChange={handleChangeImputations}
                          />
                          <input
                            value={imputation.pourcent}
                            className="form-control col-2 mb-1 ml-1 mt-4"
                            name={"name" + imputation.company}
                            onChange={handleChangeImputations}
                            id={imputation.company}
                          />
                          <h5>%</h5>
                        </div>
                      ))}

                      <Button
                        onClick={handleSubmitNonConforme}
                        className="btn btn-info offset-10 col-2 mb-4 mt-3"
                        text="Valider"
                        type="button"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-auto">
                  <ImageUpload buttonText="Choisir l'image" />
                </div>
              </div>
              <ReportComment
                urlParams={urlParams}
                setReport={setReport}
                report={report}
                valueComment={report.propreteCommuneComment}
                nameComment="propreteCommuneComment"
                valueCommentIntern={report.propreteCommuneCommentIntern}
                nameCommentIntern="propreteCommuneCommentIntern"
              ></ReportComment>
            </>
          )}
        </div>
      )}
      {loading && <div id="loading-icon"> </div>}
    </main>
  );
};

export default ReportPropretePartiesCommunesPage;
