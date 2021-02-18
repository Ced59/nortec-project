import React from "react";
import Button from "./forms/Button";

const CardConformity = ({ titre, submit }) => {
  return (
    <div className="card mt-3">
      <div className="row ml-2 d-flex justify-content-center mt-3">
        <h4 className="mb-4">{titre}</h4>
      </div>
      <div className="row ml-2 d-flex justify-content-center">
        <Button
          onClick={submit}
          className="btn btn-primary mb-4 row"
          text="Confirmer"
          type="button"
          name="conformity"
        />
      </div>
    </div>
  );
};

export default CardConformity;
