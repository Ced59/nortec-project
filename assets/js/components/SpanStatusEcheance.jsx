import React from 'react';
import { statusEcheanceClasses, statusEcheanceLabel } from './ProjectStatus';



 const SpanStatusEcheance = ({objet}) => {
    return (
      <span
        className={
          "badge badge-" +
          statusEcheanceClasses(
            objet.dateDebut,
            objet.dateCloture,
            objet.dateFinPrevue
          )
        }
      >
        {statusEcheanceLabel(
          objet.dateDebut,
          objet.dateCloture,
          objet.dateFinPrevue
        )}
      </span>
    );
  };

  export default SpanStatusEcheance