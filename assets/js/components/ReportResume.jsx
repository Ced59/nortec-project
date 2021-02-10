import React from "react";
import DateAPI from "../services/DateAPI";
import ImgGallery from "./images/ImgGallery";
import SpanBold from "./span/SpanBold";
import SpanStatusEcheance from "./span/SpanStatusEcheance";

const ReportResume = ({ report, project, photos, reportLoading, reportId }) => {
  return (
    <>
      <h3>
        Résumé du rapport du {DateAPI.formatDateHours(report.dateRedaction)} :
      </h3>

      <div className="card m-4 p-2">
        <h5 className="mt-3">
          <SpanBold text="Projet : " />
          {project.name}
        </h5>
        <p className="mt-3">
          <SpanBold text="Description : " />
          {project.description}
        </p>
        <p>
          <SpanBold text="Adresse 1 : " />
          {project.adresse1}
        </p>
        {project.adresse2 && (
          <p>
            <SpanBold text="Adresse 2 : " />
            {project.adresse2}
          </p>
        )}
        <p>
          <SpanBold text="Code Postal : " />
          {project.codePostal}
        </p>
        <p>
          <SpanBold text="Ville : " />
          {project.ville}
        </p>
      </div>

      <div className="card m-4 p-2">
        <h4 className="mb-3">Liste des Lots</h4>

        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>
                <p>Entreprises</p>
                <p>Lots</p>
              </th>
              <th>
                <p>Adresse Postale</p>
              </th>
              <th colSpan="3" className="text-center">
                <p>Interlocuteur execution</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {project.lots.map((lot) => (
              <tr key={lot.id}>
                <td>
                  <p>
                    <SpanBold text={lot.company.nom} />
                  </p>
                  <p>{lot.libelleLot}</p>
                </td>
                <td>
                  <p>{lot.company.adresse1}</p>{" "}
                  <p>
                    {lot.company.codePostal} {lot.company.ville}
                  </p>
                </td>
                <td>
                  {lot.company.annuaires.map((annuaire, i) => (
                    <p key={i}>{annuaire.nom}</p>
                  ))}
                </td>
                <td>
                  {lot.company.annuaires.map((annuaire, i) => (
                    <p key={i}> {annuaire.email}</p>
                  ))}
                </td>
                <td>
                  {lot.company.annuaires.map((annuaire, i) => (
                    <p key={i}>{annuaire.telephone}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card m-4 p-2">
        {report.securityConformity ? (
          <h4>Sécurité conforme</h4>
        ) : (
          <>
            <h4 className="mb-3">Sécurité non conforme</h4>
            <ul>
              {report.securityCommentImputations.map((imputation) => (
                <div key={imputation.id}>
                  {imputation.commentaire && (
                    <li>
                      <h6>Entreprise : {imputation.company.nom}</h6>
                      <p className="ml-2">{imputation.commentaire}</p>
                    </li>
                  )}
                </div>
              ))}
            </ul>
            <h6>Commentaire : </h6>
            <p className="ml-3">{report.propreteSecurityComment}</p>
            <h6>Commentaire interne (non visible sur le rapport final): </h6>
            <p className="ml-3">{report.propreteSecurityCommentIntern}</p>
            <h6>Photos : </h6>
            <ImgGallery photos={photos} typePhoto="security"></ImgGallery>
          </>
        )}
      </div>
      <div className="card m-4 p-2">
        {report.propreteAccessConformity === "conform" && (
          <h4>Propreté des accès conforme</h4>
        )}
        {report.propreteAccessConformity === "prorata" && (
          <h4>Propreté des accès au prorata</h4>
        )}
        {report.propreteAccessConformity === "noconform" && (
          <>
            <h4 className="mb-3">Propreté des accès non conforme</h4>
            <ul>
              {report.propreteAccessImputation.map((imputation) => (
                <div key={imputation.id}>
                  {imputation.pourcent !== 0 && (
                    <li>
                      <h6>Entreprise : {imputation.company.nom}</h6>
                      <p className="ml-2">
                        {"Pourcentage imputation : " +
                          imputation.pourcent +
                          " %"}
                      </p>
                    </li>
                  )}
                </div>
              ))}
            </ul>
            <h6>Commentaire : </h6>
            <p className="ml-3">{report.propreteAccessComment}</p>
            <h6>Commentaire interne (non visible sur le rapport final): </h6>
            <p className="ml-3">{report.propreteAccessCommentIntern}</p>
            <h6>Photos : </h6>
            <ImgGallery photos={photos} typePhoto="access"></ImgGallery>
          </>
        )}
      </div>
      <div className="card m-4 p-2">
        {report.propreteCommuneConformity && (
          <h4>Propreté des parties communes conforme</h4>
        )}

        {!report.propreteCommuneConformity && (
          <>
            <h4 className="mb-3">Propreté des parties communes non conforme</h4>
            {!reportLoading && (
              <ul>
                {report.propreteCommuneImputations.map((imputation) => (
                  <div key={imputation.id}>
                    {imputation.commentaire !== "" && (
                      <li>
                        <h6>Entreprise : {imputation.company.nom}</h6>
                        <p className="ml-2">
                          {"Pourcentage imputation : " +
                            imputation.percent +
                            " %"}
                        </p>
                        <p className="ml-2 mt-0">
                          {"Commentaire : " + imputation.commentaire}
                        </p>
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            )}
            <h6>Commentaire : </h6>
            <p className="ml-3">{report.propreteCommuneComment}</p>
            <h6>Commentaire interne (non visible sur le rapport final): </h6>
            <p className="ml-3">{report.propreteCommuneCommentIntern}</p>
            <h6>Photos : </h6>
            <ImgGallery photos={photos} typePhoto="commune"></ImgGallery>
          </>
        )}
      </div>
      <div className="card m-4 p-2">
        <h4 className="mb-3">Liste des echeances</h4>
        {project.lots.map((lot) => (
          <React.Fragment key={lot.id}>
            {lot.echeances.length !== 0 &&
              lot.echeances.some((echeance) =>
                echeance.report.includes("/api/reports/" + reportId)
              ) && (
                <>
                  <div className="row justify-content-center">
                    <div className="mx-5">
                      Lot:{" "}
                      <h5>
                        {lot.numeroLot} {lot.libelleLot}
                      </h5>
                    </div>
                    <div className="mx-5">
                      Entreprise: <h5>{lot.company.nom}</h5>
                    </div>
                  </div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Zone</th>
                        <th>Désignation</th>
                        <th>Pour le</th>
                        <th>Planning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lot.echeances.map((echeance) => (
                        <React.Fragment key={echeance.id}>
                          {echeance.report.includes(
                            "/api/reports/" + reportId
                          ) && (
                            <tr key={echeance.id}>
                              <td>{DateAPI.formatDate(echeance.dateDebut)}</td>
                              <td>{echeance.zone}</td>
                              <td>
                                <p>{echeance.sujet}</p>
                                <p>{echeance.comment}</p>
                              </td>
                              <td>
                                {DateAPI.formatDate(echeance.dateFinPrevue)}
                              </td>
                              <td>
                                <SpanStatusEcheance
                                  objet={echeance}
                                ></SpanStatusEcheance>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                  <hr />
                </>
              )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ReportResume;
