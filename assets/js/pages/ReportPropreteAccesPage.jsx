import React, { useState, useEffect } from "react";
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

const ReportPropreteAccesPage = ({ match }) => {
  const [conforme, setConforme] = useState("");
  const [comment, setComment] = useState("");
  const [commentIntern, setCommentIntern] = useState("");
  const [imputations, setImputations] = useState([]);
  const [project, setProject] = useState({});
  const [report, setReport] = useState({});
  const [imputation, setImputation] = useState({
    company: "",
    report: "",
    pourcent: "",
  });

  const NavbarLeftWithRouter = withRouter(NavbarLeft);

  const urlParams = match.params;

  // const fetchReport = () => {

  //     const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

  //     //Vérification si édition ou nouveau rapport... Dans la version finale, le nouveau rapport existera mais avec valeurs vides donc pas de vérification à ce niveau
  //     if (reportById) {
  //         setConforme(reportById.propreteAccessConformity);
  //         setComment(reportById.propreteAccessComment);
  //         setCommentIntern(reportById.propreteAccessCommentIntern);
  //         setImputations(reportById.propreteIccessImputation);
  //     }

  // };
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
      //   setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement du projet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject(urlParams.id);
    fetchReport(urlParams.idReport);
  }, [urlParams.id, urlParams.idReport]);

  const handleCheckConformity = ({ currentTarget }) => {
    const name = currentTarget.name;
    setConforme(name);
  };

  const handleChangeCommentIntern = ({ currentTarget }) => {
    const value = currentTarget.value;

    setCommentIntern(value);
  };

  const handleChangeComment = ({ currentTarget }) => {
    const value = currentTarget.value;

    setComment(value);
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
    const value = currentTarget.value;
    setImputation(value);
  };


  const handleSubmitConform = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.propreteAccessConformity = "conform";
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitProrata = async () => {
    //TODO enregistrement de la conformité à prorata
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.propreteAccessConformity = "proprata";
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitNonConforme = async () => {
    //TODO enregistrement de la conformité à noconform
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.propreteAccessConformity = "noconform";
      await ReportsAPI.update(urlParams.idReport, report);

      toast.success("Statut de la propreté des accès enregistré avec succès!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitComment = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.propreteAccessComment = comment;
      report.propreteAccessCommentIntern = commentIntern;
      await ReportsAPI.update(urlParams.idReport, report);
      toast.success("Commentaires enregistré avec succès!");

    } catch (error) {
      console.log(error);
    }
  };
  console.log(imputation.pourcent);

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="proprete" />

      <div className="page-content">
        <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
          <h2 className="mb-4">Propreté des accès :</h2>
          <Button
            onClick={handleCheckConformity}
            name="conform"
            className="btn btn-success mb-4"
            text="Conforme"
            type="button"
          />

          <Button
            onClick={handleCheckConformity}
            name="noconform"
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
                onClick={handleSubmitConform}
                className="btn btn-info mb-4 row"
                text="Valider"
                type="button"
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
                onClick={handleSubmitProrata}
                className="btn btn-info mb-4 row"
                text="Valider"
                type="button"
              />
            </div>
          </div>
        )}
        {conforme === "noconform" && (
          <>
            <Button
              onClick={handleCheckConformity}
              name="prorata"
              className="btn btn-warning ml-5 mb-4"
              text="Prorata"
              type="button"
            />
            <div className="row">
              <form className="col-8">
                <div className="col-12">
                  {project.lots.map((lot) => (
                    <div className="row" key={lot.id}>
                      <h5 className="col-9">{lot.company.nom}</h5>

                      <input
                        value={imputation.pourcent}
                        className="form-control col-2 mb-1"
                        name="pourcent"
                        onChange={handleChangeImputations}
                        id={lot.id}
                      />
                      <h5 className="col-1 mb-1">%</h5>
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
              <div className="col-4">
                <ImageUpload buttonText="Choisir l'image" />
              </div>
            </div>
            <div className="row">
              <form className="col-12">
                <div className="d-flex flex-row">
                  <div className="col-6">
                    <FieldTextArea
                      label="Commentaire : "
                      placeholder="Commentaire pour toute les entreprises"
                      value={comment}
                      onChange={handleChangeComment}
                      name="propreteAccessComment"
                    />
                  </div>
                  <div className="col-6">
                    <FieldTextArea
                      label="Commentaire interne : "
                      placeholder="Commentaire pour toute les entreprises"
                      value={commentIntern}
                      onChange={handleChangeCommentIntern}
                      name="propreteAccessCommentIntern"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSubmitComment}
                  className="btn btn-info offset-10 col-2 mb-4 mt-3"
                  text="Valider"
                  type="button"
                />
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ReportPropreteAccesPage;
