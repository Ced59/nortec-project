import React, { useState } from "react";
import { toast } from "react-toastify";
import ProjectsAPI from "../services/ProjectsAPI";
import ReportsAPI from "../services/ReportsAPI";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";

const ReportComment = ({urlParams, report, setReport,valueComment, valueCommentIntern, nameComment, nameCommentIntern}) => {
  const handleChangeComment = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setReport({ ...report, [name]: value });
  };

  const handleSubmitComment = async () => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      await ReportsAPI.update(urlParams.idReport, report);
      toast.success("Commentaires enregistré avec succès!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <form className="col-12">
          <div className="d-flex flex-row">
            <div className="col-6">
              <FieldTextArea
                label="Commentaire : "
                value={valueComment}
                name={nameComment}
                placeholder="Commentaire pour toute les entreprises"
                onChange={handleChangeComment}
              />
            </div>
            <div className="col-6">
              <FieldTextArea
                label="Commentaire interne : "
                value={valueCommentIntern}
                name={nameCommentIntern}
                placeholder="Commentaire interne"
                onChange={handleChangeComment}
              />
            </div>
          </div>
          <Button
            onClick={handleSubmitComment}
            className="btn btn-info offset-10 col-2 mb-4 mt-3"
            text="Valider les commentaires"
            type="button"
          />
        </form>
      </div>
    </>
  );
};

export default ReportComment;
