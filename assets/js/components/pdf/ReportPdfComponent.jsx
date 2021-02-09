import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import DateAPI from "../../services/DateAPI";
import { statusEcheanceLabel } from "../ProjectStatus";
import PdfPhotoGallery from "./PdfPhotoGallery";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  image: {
    width: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: "20pt",
  },
  sectionBorder: {
    border: "1pt solid #005274",
    marginLeft: 10,
    marginRight: 10,
    padding: 7,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: "5",
    borderTopRightRadius: "5",
    borderBottomRightRadius: "5",
    borderBottomLeftRadius: "5",
    fontSize: "14pt",
  },
  text: {
    margin: "5pt",
  },
  textEffectifsNomEntreprise: {
    margin: "2pt",
    fontWeight: "bold",
  },
  textEffectifsInfos: {
    marginLeft: "40pt",
  },
  listEffectifs: {
    marginTop: "15pt",
  },
  table: {
    display: "table",
    border: "1pt solid #005274",
    margin: 10,
    textAlign: "center",
  },
  tableRowHead: {
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
    margin: "auto",
    borderTop: "1pt solid #005274",
  },
  tableColHead: {
    width: "20%",
    borderLeft: "1pt solid #005274",
    fontSize: 10,
    padding: 5,
  },
  tableCol1Head: {
    width: "20%",
    fontSize: 10,
    padding: 5,
  },
  tableColHeadInterlocuteur: {
    width: "60%",
    borderLeft: "1pt solid #005274",
    fontSize: 10,
    padding: 5,
  },
  tableCol: {
    width: "20%",
    borderLeft: "1pt solid #005274",
    padding: 8,
  },
  tableColTelephone: {
    width: "15%",
    borderLeft: "1pt solid #005274",
    padding: 8,
  },
  tableColEmail: {
    width: "25%",
    borderLeft: "1pt solid #005274",
    padding: 8,
  },
  tableCol1: {
    width: "20%",
    padding: 5,
  },
  tableCell: {
    fontSize: 8,
  },
  flexAlignBetween: {
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  projectImage: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
  },

  photosImputation: {
    width: "30%",
    marginTop: 5,
  },

  flexAround: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});

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
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
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
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${report.Project.name} - ${report.Project.ville} - Page: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            source="../img/logo-company/logo-nortec.png"
            style={styles.image}
          />
        </View>

        <View style={styles.sectionBorder}>
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
              <View style={styles.tableRow}>
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
                    <Text style={styles.tableCell}>{annuaire.nom}</Text>
                  ))}
                </View>
                <View style={styles.tableColEmail}>
                  {lot.company.annuaires.map((annuaire) => (
                    <Text style={styles.tableCell}>{annuaire.email}</Text>
                  ))}
                </View>
                <View style={styles.tableColTelephone}>
                  {lot.company.annuaires.map((annuaire) => (
                    <Text style={styles.tableCell}>{annuaire.telephone}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${report.Project.name} - ${report.Project.ville} - Page: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            source="../img/logo-company/logo-nortec.png"
            style={styles.image}
          />
        </View>

        <View style={styles.sectionBorder}>
          <Text style={styles.title}>Sécurité</Text>
          {report.securityConformity ? (
            <Text style={styles.title}>Conforme</Text>
          ) : (
            <View>
              <Text style={styles.title}>Non Conforme</Text>
              <View style={styles.listEffectifs}>
                <Text>Imputations : </Text>
                {report.securityCommentImputations.map((security) => (
                  <View style={styles.listEffectifs}>
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
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${report.Project.name} - ${report.Project.ville} - Page: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            source="../img/logo-company/logo-nortec.png"
            style={styles.image}
          />
        </View>

        <View style={styles.sectionBorder}>
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
                  <View style={styles.listEffectifs}>
                    <Text
                      style={[
                        styles.textEffectifsNomEntreprise,
                        { fontSize: 10 },
                      ]}
                    >
                      {proprete.company.nom + " :  " + proprete.pourcent + " %"}
                    </Text>
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
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${report.Project.name} - ${report.Project.ville} - Page: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            source="../img/logo-company/logo-nortec.png"
            style={styles.image}
          />
        </View>

        <View style={styles.sectionBorder}>
          <Text style={styles.title}>Propreté des parties communes</Text>
          {report.propreteCommuneConformity ? (
            <Text style={styles.title}>Conforme</Text>
          ) : (
            <View>
              <Text style={styles.title}>Non Conforme</Text>
              <View style={styles.listEffectifs}>
                <Text>Imputations : </Text>
                {report.propreteCommuneImputations.map((proprete) => (
                  <View style={styles.listEffectifs}>
                    <Text style={styles.textEffectifsNomEntreprise}>
                      {proprete.company.nom + " :" + proprete.percent + " %"}
                    </Text>
                    <Text style={styles.textEffectifsInfos}>
                      {"Commentaire :" + proprete.commentaire}
                    </Text>
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
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${report.Project.name} - ${report.Project.ville} - Page: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section} fixed>
          <Image
            source="../img/logo-company/logo-nortec.png"
            style={styles.image}
          />
        </View>
        {project.lots.map((lot) => (
          <View>
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
                      <View>
                        {echeance.report.includes(
                          "/api/reports/" + report.id
                        ) && (
                          <View style={styles.tableRow}>
                            <View style={[styles.tableCol1, { width: "10%" }]}>
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
