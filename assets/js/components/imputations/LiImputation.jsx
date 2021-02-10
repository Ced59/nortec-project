import React from "react";
import PImputation from "./PImputation";

const LiImputation = ({ condition, imputation }) => {
  return (
    <>
      {condition && (
        <li>
          <h6>Entreprise : {imputation.company.nom}</h6>
          {imputation.pourcent !== undefined && (
            <PImputation
              text={"Pourcentage imputation : " + imputation.pourcent + " %"}
            />
          )}
          {imputation.percent !== undefined && (
            <PImputation
              text={"Pourcentage imputation : " + imputation.percent + " %"}
            />
          )}
          {imputation.commentaire && (
            <PImputation text={"Commentaire : " + imputation.commentaire} />
          )}
        </li>
      )}
    </>
  );
};

export default LiImputation;
