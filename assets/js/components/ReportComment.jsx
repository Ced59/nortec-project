import React from "react";
import { toast } from "react-toastify";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ReportsAPI from "../services/ReportsAPI";

const ReportComment = ({
  report,
  setReport,
  valueComment,
  valueCommentIntern,
  nameComment,
  nameCommentIntern,
  fetchReport,
  idReport,
}) => {
  const handleChangeComment = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setReport({ ...report, [name]: value });
  };

  const handleSubmitComments = async () => {
    const reportComments = {
      [nameComment]: valueComment,
      [nameCommentIntern]: valueCommentIntern,
    };
    try {
      await ReportsAPI.update(idReport, reportComments);
      toast.success(
        "Commentaires mis à jour"
      );
      fetchReport(idReport);
    } catch (e) {
      console.log(e);
      console.log(e.response);
      toast.error(
        "Une erreur est survenue lors de la mise à jour des commentaires"
      );
    }
  };

  return (
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
          onClick={handleSubmitComments}
          className="btn btn-info offset-10 col-2 mb-4 mt-3"
          text="Valider les commentaires"
          type="button"
          name="comment"
        />
      </form>
    </div>
  );
};

export default ReportComment;
