import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import DateAPI from "../../services/DateAPI";
import { statusEcheanceLabel } from "../ProjectStatus";
import PdfPhotoGallery from "./PdfPhotoGallery";
import styles from "./PdfStyle";

const ReportPdfComponent = ({ report, project, photos }) => {
  const statusColor = (dateDebut, dateCloture, dateFinPrevue) => {
    if (
      statusEcheanceLabel(dateDebut, dateCloture, dateFinPrevue) === "En cours"
    ) {
      return "#ffc107";
    } else if (
      statusEcheanceLabel(dateDebut, dateCloture, dateFinPrevue) === "En retard"
    ) {
      return "#dc3545";
    } else if (
      statusEcheanceLabel(dateDebut, dateCloture, dateFinPrevue) === "Fini"
    ) {
      return "#28a745";
    } else if (
      statusEcheanceLabel(dateDebut, dateCloture, dateFinPrevue) ===
      "Pas démarré"
    ) {
      return "#17a2b8";
    }
  };
  return (
    <Document
      title={report.Project.name}
      subject={"Rapport du " + DateAPI.formatDate(report.dateRedaction)}
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section} fixed>
          <Image
            source="../img/logo-company/logo-nortec.png"
            style={styles.image}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            {"Opération :  " + report.Project.name}
          </Text>
          <Text style={styles.title}>
            {"Rapport OPC du " + DateAPI.formatDate(report.dateRedaction)}
          </Text>
        </View>
        <View style={styles.flexAlignBetween}>
          <View style={styles.sectionBorder}>
            <Text style={styles.text}>
              {"Opération : " + report.Project.name}
            </Text>
            <Text style={styles.text}>
              {"Description : " + report.Project.description}
            </Text>
            <Text style={styles.text}>
              {"Adresse 1 : " + report.Project.adresse1}
            </Text>
            <Text style={styles.text}>
              {"Adresse 2 : " + report.Project.adresse2}
            </Text>
            <Text style={styles.text}>
              {"Code Postal : " + report.Project.codePostal}
            </Text>
            <Text style={styles.text}>{"Ville : " + report.Project.ville}</Text>
          </View>
          <Image style={styles.projectImage} src={project.photo}></Image>
          <View style={styles.sectionBorder}>
            <Text style={styles.text}>{"Maitre d'ouvrage : "}</Text>
            <Text style={styles.text}>
              {"MOEX - OPC : " +
                report.Project.nomMOEX +
                " - " +
                report.Project.nomOPC}
            </Text>
          </View>
        </View>
        <View style={styles.sectionBorder} break>
          <Text style={styles.title}>Liste des Entreprises</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHead}>
              <View style={styles.tableCol1Head}>
                <Text>Entreprises</Text>
                <Text>Lots</Text>
              </View>
              <View style={styles.tableColHead}>
                <Text>Adresses Postales</Text>
              </View>
              <View style={styles.tableColHeadInterlocuteur}>
                <Text>Interlocuteurs</Text>
              </View>
            </View>
            {project.lots.map((lot) => (
              <View key={lot.id} style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>{lot.company.nom}</Text>
                  <Text style={styles.tableCell}>{lot.libelleLot}</Text>
                </View>
                <View style={styles.tableCol}>
                  <View style={styles.tableCell}>
                    <Text>{lot.company.adresse1}</Text>
                    <Text>
                      {lot.company.codePostal} {lot.company.ville}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableCol}>
                  {lot.company.annuaires.map((annuaire) => (
                    <Text key={annuaire.id} style={styles.tableCell}>
                      {annuaire.nom}
                    </Text>
                  ))}
                </View>
                <View style={styles.tableColEmail}>
                  {lot.company.annuaires.map((annuaire) => (
                    <Text key={annuaire.id} style={styles.tableCell}>
                      {annuaire.email}
                    </Text>
                  ))}
                </View>
                <View style={styles.tableColTelephone}>
                  {lot.company.annuaires.map((annuaire) => (
                    <Text key={annuaire.id} style={styles.tableCell}>
                      {annuaire.telephone}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.sectionBorder} break>
          <Text style={styles.title}>Sécurité</Text>
          {report.securityConformity ? (
            <Text style={styles.title}>Conforme</Text>
          ) : (
            <View>
              <Text style={styles.title}>Non Conforme</Text>
              <View style={styles.listEffectifs}>
                <Text>Imputations : </Text>
                {report.securityCommentImputations.map((security) => (
                  <View key={security.id} style={styles.listEffectifs}>
                    {security.commentaire !== "" && (
                      <View>
                        <Text style={styles.textEffectifsNomEntreprise}>
                          {security.company.nom + " :"}
                        </Text>
                        <Text style={styles.textEffectifsInfos}>
                          {"Commentaire : " + security.commentaire}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <Text style={styles.listEffectifs}> Photos : </Text>
              <PdfPhotoGallery
                photos={photos}
                viewStyle={styles.flexAround}
                imageStyle={styles.photosImputation}
                typePhoto="security"
              ></PdfPhotoGallery>
            </View>
          )}
        </View>
        <View style={styles.sectionBorder} break>
          <Text style={styles.title}>Propreté des accès</Text>
          {report.propreteAccessConformity === "conform" && (
            <Text style={styles.title}>Conforme</Text>
          )}
          {report.propreteAccessConformity === "prorata" && (
            <Text style={styles.title}>Imputations au Prorata</Text>
          )}
          {report.propreteAccessConformity === "noconform" && (
            <View>
              <Text style={styles.title}>Non Conforme</Text>
              <View style={styles.listEffectifs}>
                <Text>Imputations : </Text>
                {report.propreteAccessImputation.map((proprete) => (
                  <View key={proprete.id}>
                    {proprete.pourcent != 0 && (
                      <View style={styles.listEffectifs}>
                        <Text
                          style={[
                            styles.textEffectifsNomEntreprise
                          ]}
                        >
                          {proprete.company.nom +
                            " :  " +
                            proprete.pourcent +
                            " %"}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <Text style={{ marginVertical: 10 }}>Commentaire : </Text>
              <Text style={{ fontSize: 10 }}>
                {report.propreteAccessComment}
              </Text>
              <Text style={styles.listEffectifs}> Photos : </Text>
              <PdfPhotoGallery
                photos={photos}
                viewStyle={styles.flexAround}
                imageStyle={styles.photosImputation}
                typePhoto="access"
              ></PdfPhotoGallery>
            </View>
          )}
        </View>

        <View style={styles.sectionBorder} break>
          <Text style={styles.title}>Propreté des parties communes</Text>
          {report.propreteCommuneConformity ? (
            <Text style={styles.title}>Conforme</Text>
          ) : (
            <View>
              <Text style={styles.title}>Non Conforme</Text>
              <View style={styles.listEffectifs}>
                <Text>Imputations : </Text>
                {report.propreteCommuneImputations.map((proprete) => (
                  <View key={proprete.id}>
                    {proprete.commentaire == "" && (
                      <View style={styles.listEffectifs}>
                        <Text style={styles.textEffectifsNomEntreprise}>
                          {proprete.company.nom +
                            " :" +
                            proprete.percent +
                            " %"}
                        </Text>
                        <Text style={styles.textEffectifsInfos}>
                          {"Commentaire :" + proprete.commentaire}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <Text style={{ marginVertical: 10 }}>Commentaire : </Text>
              <Text style={{ fontSize: 10 }}>
                {report.propreteCommuneComment}
              </Text>
              <Text style={styles.listEffectifs}> Photos : </Text>
              <PdfPhotoGallery
                photos={photos}
                viewStyle={styles.flexAround}
                imageStyle={styles.photosImputation}
                typePhoto="commune"
              ></PdfPhotoGallery>
            </View>
          )}
        </View>
        <View break>
          {project.lots.map((lot) => (
            <View key={lot.id}>
              {lot.echeances.length !== 0 &&
                lot.echeances.some((echeance) =>
                  echeance.report.includes("/api/reports/" + report.id)
                ) && (
                  <View break>
                    <View
                      style={[
                        styles.table,
                        { width: "90%" },
                        { marginLeft: "5%" },
                        { marginRight: "5%" },
                      ]}
                    >
                      <Text style={[styles.tableCell, { fontSize: 10 }]}>
                        Entreprise: {lot.company.nom}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.table,
                        { width: "90%" },
                        { marginLeft: "5%" },
                        { marginRight: "5%" },
                      ]}
                    >
                      <View style={styles.tableRowHead}>
                        <View style={[styles.tableCol1Head, { width: "10%" }]}>
                          <Text style={styles.tableCell}>Date</Text>
                        </View>
                        <View style={styles.tableColHead}>
                          <Text style={styles.tableCell}>Zone</Text>
                        </View>
                        <View style={[styles.tableColHead, { width: "40%" }]}>
                          <Text style={styles.tableCell}>Désignation</Text>
                        </View>
                        <View style={[styles.tableColHead, { width: "10%" }]}>
                          <Text style={styles.tableCell}>Pour le</Text>
                        </View>
                        <View style={styles.tableColHead}>
                          <Text style={styles.tableCell}>Planning</Text>
                        </View>
                      </View>
                      {lot.echeances.map((echeance) => (
                        <View key={echeance.id}>
                          {echeance.report.includes(
                            "/api/reports/" + report.id
                          ) && (
                            <View style={styles.tableRow}>
                              <View
                                style={[styles.tableCol1, { width: "10%" }]}
                              >
                                <Text style={styles.tableCell}>
                                  {DateAPI.formatDate(echeance.dateDebut)}
                                </Text>
                              </View>
                              <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                  {echeance.zone}
                                </Text>
                              </View>
                              <View style={[styles.tableCol, { width: "40%" }]}>
                                <Text style={styles.tableCell}>
                                  {echeance.sujet}
                                </Text>
                                <Text style={styles.tableCell}>
                                  {echeance.comment}
                                </Text>
                              </View>
                              <View style={[styles.tableCol, { width: "10%" }]}>
                                <Text style={styles.tableCell}>
                                  {DateAPI.formatDate(echeance.dateFinPrevue)}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.tableCol,
                                  {
                                    backgroundColor: statusColor(
                                      echeance.dateDebut,
                                      echeance.dateCloture,
                                      echeance.dateFinPrevue
                                    ),
                                  },
                                ]}
                              >
                                <Text style={styles.tableCell}>
                                  {statusEcheanceLabel(
                                    echeance.dateDebut,
                                    echeance.dateCloture,
                                    echeance.dateFinPrevue
                                  )}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                )}
            </View>
          ))}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${report.Project.name} - ${report.Project.ville} - Page: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default ReportPdfComponent;
