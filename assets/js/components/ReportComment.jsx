import React from "react";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";

const ReportComment = ({
  report,
  setReport,
  valueComment,
  valueCommentIntern,
  nameComment,
  nameCommentIntern,
  handleSubmitComment,
}) => {
  const handleChangeComment = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setReport({ ...report, [name]: value });
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
          onClick={handleSubmitComment}
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
