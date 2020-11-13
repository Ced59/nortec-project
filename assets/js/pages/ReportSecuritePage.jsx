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
  const [imputations, setImputations] = useState([]);
  const [imputation, setImputation] = useState({
    commentaire: "",
  });
  const [editImput, setEditImput] = useState();

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
      // --------------set imputations-------------
      if (data.securityCommentImputations == 0) {
        setEditImput(false);
        data.Project.lots.map((imput) =>
          imputations.push({
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            commentaire: "",
          })
        );
        console.log(imputations);
      } else {
        setEditImput(true);
        data.securityCommentImputations.map((imput) =>
          imputations.push({
            companyName: imput.company.nom,
            company: "/api/companies/" + imput.company.id,
            report: "/api/reports/" + urlParams.idReport,
            commentaire: imput.commentaire,
          })
        );
        console.log(imputations);
        // ---------------------------------------------
      }
    } catch (error) {
      toast.error("Erreur lors du chargement du rapport");
      console.log(error);
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

  const handleChangeImputations = ({ currentTarget }) => {
    const { value, id, name } = currentTarget;
    const copyImputations = [...imputations];
    console.log(copyImputations[id]);
    console.log(currentTarget.id);
    console.log(name);
    console.log(value);

    const newImput = copyImputations[id];
    newImput.commentaire = value;

    copyImputations.splice(id, 1, newImput);
    setImputations(copyImputations);

    console.log(imputations);
    console.log(newImput);
  };

  const submitImput = async (imput) => {
    if (!editImput) {
      try {
        await PropreteAccesAPI.createPropreteAccessImputations(imput);
        setEditImput(true);
        toast.success("Imputations créées");
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        await PropreteAccesAPI.updatePropreteAccessImputations(imput);
        toast.success("Imputations misent à jour");
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const handleSubmitConform = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      report.securityConformity = true;
      await ReportsAPI.update(urlParams.idReport, report);

      imputations.map((imput) => submitImput(imput));

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
                      {imputations.map((imputation, i) => (
                        <div
                          className="d-flex flex-row align-items-center"
                          key={i}
                        >
                          <h5 className="col-7">{imputation.companyName}</h5>

                          <FieldTextArea
                            value={imputations[i].commentaire}
                            className="form-control mb-1"
                            name="commentaire"
                            onChange={handleChangeImputations}
                            id={i}
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
