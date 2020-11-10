import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import "../../css/app.css";
import { toast } from "react-toastify";
import fakeData from "../components/fakeDataForDev/fakeData";
import ReportsAPI from "../services/ReportsAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import ReportComment from "../components/ReportComment";


const ReportSecuritePage = ({ match }) => {
  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const [conforme, setConforme] = useState(null);
  const [entreprise, setEntreprise] = useState(null);
  const [project, setProject] = useState({});

  const handleCheckConforme = () => {
    setConforme(true);
  };

  const handleCheckNonConforme = () => {
    setConforme(false);
  };

  const handleSubmit = () => {};

  const [comment, setComment] = useState("");
  const [commentIntern, setCommentIntern] = useState("");
  const [imputations, setImputations] = useState("");
  const [imputation, setImputation] = useState({
    commentaire: "",
  });

  //   const fetchReport = () => {
  //     setReport(reportById);
  //     //Vérification si édition ou nouveau rapport... Dans la version finale, le nouveau rapport existera mais avec valeurs vides donc pas de vérification à ce niveau
  //     if (reportById) {
  //       setConforme(reportById.securityConformity);
  //       setComment(reportById.securityConmment);
  //       setCommentIntern(reportById.securityConmmentIntern);
  //       setImputations(reportById.securityConmment_imputations);
  //     }
  //   };

  const urlParams = match.params;

  // const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

  // const [report, setReport] = useState(reportById);

  // useEffect(() => {
  //     //TODO Normalement charge le projet à chaque fois que l'id change. Attention plus tard vérifier que tout fonctionne avec axios
  //     fetchReport();

  // }, []);

  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

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

  const handleSubmitConform = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.securityConformity = true;
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitNonConforme = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.securityConformity = false;
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangeImputations = ({ currentTarget }) => {
    console.log(currentTarget.id);

    console.log(currentTarget.value);

    const imputs = imputations;
    imputs[currentTarget.id].pourcent = parseInt(currentTarget.value, 10);

    setImputations("");
    setImputations(imputs);

    console.log(imputations);
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEntreprise({ ...entreprise, [name]: value });
  };

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="securite" />
      {!loading && (
        <>
          <div className="page-content">
            <div className="ml-2 mt-4 d-flex justify-content-between mb-3">
              <h2 className="mb-4">Sécurité :</h2>
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
                  <h4 className="mb-4">Sécurité conforme ?</h4>
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
                <div className="row col-12">
                  <form className="col-8">
                    <div className="col-12">
                      {project.lots.map((lot) => (
                        <div
                          className="d-flex flex-row align-items-center"
                          key={lot.id}
                        >
                          <h5 className="col-7">{lot.company.nom}</h5>

                          <FieldTextArea
                            value={imputation.commentaire}
                            className="form-control mb-1"
                            name={"name" + lot.company.id}
                            onChange={handleChangeImputations}
                          />
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
                  <div className="ml-auto">
                    <ImageUpload buttonText="Choisir l'image" />
                  </div>
                </div>
                <ReportComment
                  urlParams={urlParams}
                  setReport={setReport}
                  report={report}
                  valueComment={report.securityConmment}
                  nameComment="securityConmment"
                  valueCommentIntern={report.securityConmmentIntern}
                  nameCommentIntern="securityConmmentIntern"
                ></ReportComment>
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
