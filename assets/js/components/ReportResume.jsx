import React from "react";
import DateAPI from "../services/DateAPI";
import LiImputation from "./imputations/LiImputation";
import ReportCard from "./ReportCard";
import SpanBold from "./span/SpanBold";
import SpanStatusEcheance from "./span/SpanStatusEcheance";
import ReportContainer from "./wrapper/ReportContainer";

const ReportResume = ({ report, project, photos, reportLoading, reportId }) => {
  return (
    <>
      <h3>
        Résumé du rapport du {DateAPI.formatDateHours(report.dateRedaction)} :
      </h3>

      <ReportContainer>
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
      </ReportContainer>

      <ReportContainer>
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
                  <p>{lot.company.adresse1}</p>
                  <p>
                    {lot.company.codePostal} {lot.company.ville}
                  </p>
                </td>
                <td>
                  {lot.company.annuaires.map((annuaire) => (
                    <p key={annuaire.id}>{annuaire.nom}</p>
                  ))}
                </td>
                <td>
                  {lot.company.annuaires.map((annuaire) => (
                    <p key={annuaire.id}> {annuaire.email}</p>
                  ))}
                </td>
                <td>
                  {lot.company.annuaires.map((annuaire) => (
                    <p key={annuaire.id}>{annuaire.telephone}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ReportContainer>

      <ReportContainer>
        {report.securityConformity ? (
          <h4>Sécurité conforme</h4>
        ) : (
          <ReportCard
            category="Sécurité"
            comment={report.propreteSecurityComment}
            commentItern={report.propreteSecurityCommentIntern}
            photos={photos}
            typePhoto="security"
          >
            <ul>
              {report.securityCommentImputations.map((imputation) => (
                <LiImputation
                  key={imputation.id}
                  imputation={imputation}
                  condition={imputation.commentaire}
                ></LiImputation>
              ))}
            </ul>
          </ReportCard>
        )}
      </ReportContainer>
      <ReportContainer>
        {report.propreteAccessConformity === "conform" && (
          <h4>Propreté des accès conforme</h4>
        )}
        {report.propreteAccessConformity === "prorata" && (
          <h4>Propreté des accès au prorata</h4>
        )}
        {report.propreteAccessConformity === "noconform" && (
          <ReportCard
            category="Propreté des accès"
            comment={report.propreteAccessComment}
            commentItern={report.propreteAccessCommentIntern}
            photos={photos}
            typePhoto="access"
          >
            <ul>
              {report.propreteAccessImputation.map((imputation) => (
                <LiImputation
                  key={imputation.id}
                  imputation={imputation}
                  condition={imputation.pourcent !== 0}
                ></LiImputation>
              ))}
            </ul>
          </ReportCard>
        )}
      </ReportContainer>
      <ReportContainer>
        {report.propreteCommuneConformity && (
          <h4>Propreté des parties communes conforme</h4>
        )}

        {!report.propreteCommuneConformity && (
          <ReportCard
            category="Propreté des parties communes"
            comment={report.propreteCommuneComment}
            commentItern={report.propreteCommuneCommentIntern}
            photos={photos}
            typePhoto="commune"
          >
            {!reportLoading && (
              <ul>
                {report.propreteCommuneImputations.map((imputation) => (
                  <LiImputation
                    key={imputation.id}
                    imputation={imputation}
                    condition={imputation.commentaire}
                  ></LiImputation>
                ))}
              </ul>
            )}
          </ReportCard>
        )}
      </ReportContainer>
      <ReportContainer>
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
                                  dateReport={report.dateRedaction}
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
      </ReportContainer>
    </>
  );
};

export default ReportResume;
