import React from "react";
import { statusEcheanceClasses, statusEcheanceLabel } from "../ReportStatus";

const SpanStatusEcheance = ({ objet, dateReport }) => {
  return (
    <span
      className={
        "badge badge-" +
        statusEcheanceClasses(
          objet.dateDebut,
          objet.dateCloture,
          objet.dateFinPrevue,
          dateReport
        )
      }
    >
      {statusEcheanceLabel(
        objet.dateDebut,
        objet.dateCloture,
        objet.dateFinPrevue,
        dateReport
      )}
    </span>
  );
};

export default SpanStatusEcheance;
