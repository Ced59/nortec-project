import React from 'react';

const ReportConformity = () => {
  const handleCheckConformity = (etat) => {
    setConforme(etat);
  };

  const handleSubmitReport = async ({ currentTarget }) => {
    try {
      report.Project = "/api/projects/" + urlParams.id;
      if (currentTarget.name == "conformity") {
        report.propreteAccessConformity = conforme;
      }
      report.securityCommentImputations = report.securityCommentImputations.map(
        (imput) => "/api/security_comment_imputations/" + imput.id
      );
      report.propreteAccessImputation = report.propreteAccessImputation.map(
        (imput) => "/api/proprete_access_imputations/" + imput.id
      );
      report.propreteCommuneImputations = report.propreteCommuneImputations.map(
        (imput) => "/api/proprete_commune_imputations/" + imput.id
      );

      await ReportsAPI.update(urlParams.idReport, report);
      if (currentTarget.name == "conformity") {
        toast.success(
          "Statut de la propreté des accès enregistré avec succès!"
        );
      } else {
        toast.success("Commentaires enregistré avec succès!");
      }
      fetchReport(urlParams.idReport);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export default ReportConformity;