import React from 'react';
import {Document, Page, Text, View, StyleSheet, Image} from "@react-pdf/renderer";
import DateAPI from "../../services/DateAPI";


const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white'
    },
    section: {
        margin: 10,
        padding: 10,

    },
    image: {
        width: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: '25pt'
    },
    sectionBorder: {
        border: '1pt solid #005274',
        marginLeft: 10,
        marginRight: 10,
        padding: 7,
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: '5',
        borderTopRightRadius: '5',
        borderBottomRightRadius: '5',
        borderBottomLeftRadius: '5',
        fontSize: '15pt'
    },
    text: {
        margin: '5pt',
    },
    textEffectifsNomEntreprise: {
        margin: '2pt',
        fontWeight: 'bold'
    },
    textEffectifsInfos: {
        marginLeft: '40pt',
    },
    listEffectifs: {
        marginTop: '15pt'
    }

});


const ReportPdfComponent = ({report}) => {
    return (
        <Document title={report.project.name} subject={'Rapport du ' + DateAPI.formatDate(report.dateRedaction)}>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image source='../img/logo-company/logo-nortec.png' style={styles.image}/>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>{'Opération :  ' + report.project.name}</Text>
                    <Text style={styles.title}>{'Rapport OPC du ' + DateAPI.formatDate(report.dateRedaction)}</Text>
                </View>
                <View style={styles.sectionBorder}>
                    <Text style={styles.text}>{'Opération : ' + report.project.name}</Text>
                    <Text style={styles.text}>{'Description : ' + report.project.description}</Text>
                    <Text style={styles.text}>{'Adresse 1 : ' + report.project.adresse1}</Text>
                    <Text style={styles.text}>{'Adresse 2 : ' + report.project.adresse2}</Text>
                    <Text style={styles.text}>{'Code Postal : ' + report.project.code_postal}</Text>
                    <Text style={styles.text}>{'Ville : ' + report.project.ville}</Text>
                </View>

            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image source='../img/logo-company/logo-nortec.png' style={styles.image}/>
                </View>

                <View style={styles.sectionBorder}>
                    <Text style={styles.title}>Effectifs de la Semaine 1</Text>
                    <Text style={styles.title}>(01/01/2020 au 07/01/2020)</Text>

                    <View style={styles.listEffectifs}>
                        {report.lots.map(lot =>
                            <View style={styles.listEffectifs}>
                                <Text style={styles.textEffectifsNomEntreprise}>{lot.entreprise.nom + ' :'}</Text>
                                <Text style={styles.textEffectifsInfos}>{'N° Lot : ' + lot.numero_lot}</Text>
                                <Text style={styles.textEffectifsInfos}>{'Intitulé Lot : ' + lot.libelle_lot}</Text>
                                <Text
                                    style={styles.textEffectifsInfos}>{'Effectifs prévus : ' + lot.effectif_prevu}</Text>
                                <Text
                                    style={styles.textEffectifsInfos}>{'Effectifs constatés : ' + lot.effectif_constate}</Text>
                            </View>
                        )}
                    </View>
                </View>

            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image source='../img/logo-company/logo-nortec.png' style={styles.image}/>
                </View>

                <View style={styles.sectionBorder}>
                    <Text style={styles.title}>Sécurité</Text>
                    {report.security_conformity
                        ?
                        <Text style={styles.title}>Conforme</Text>
                        :
                        <View>
                            <Text style={styles.title}>Non Conforme</Text>
                            <View style={styles.listEffectifs}>
                                <Text>Imputations : </Text>
                                {report.security_comment_imputations.map(security =>
                                    <View style={styles.listEffectifs}>
                                        {security.commentaire !== "" &&
                                        <View>
                                            <Text
                                                style={styles.textEffectifsNomEntreprise}>{security.company.nom + ' :'}</Text>
                                            <Text
                                                style={styles.textEffectifsInfos}>{'Commentaire : ' + security.commentaire}</Text>
                                        </View>
                                        }

                                    </View>
                                )}
                            </View>
                        </View>
                    }


                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image source='../img/logo-company/logo-nortec.png' style={styles.image}/>
                </View>

                <View style={styles.sectionBorder}>
                    <Text style={styles.title}>Propreté des accès</Text>
                    {report.proprete_access_conformity === 'conform' &&

                    <Text style={styles.title}>Conforme</Text>
                    }
                    {report.proprete_access_conformity === 'prorata' &&

                    <Text style={styles.title}>Imputations au Prorata</Text>
                    }
                    {report.proprete_access_conformity === 'noconform' &&

                    <View>
                        <Text style={styles.title}>Non Conforme</Text>
                        <View style={styles.listEffectifs}>
                            <Text>Imputations : </Text>
                            {report.proprete_access_imputation.map(proprete =>
                                <View style={styles.listEffectifs}>
                                    <Text
                                        style={styles.textEffectifsNomEntreprise}>{proprete.company.nom + ' :' + proprete.pourcent + ' %'}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    }
                    
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image source='../img/logo-company/logo-nortec.png' style={styles.image}/>
                </View>

                <View style={styles.sectionBorder}>
                    <Text style={styles.title}>Propreté des parties communes</Text>
                    {report.proprete_commune_conformity
                        ?
                        <Text style={styles.title}>Conforme</Text>
                        :
                        <View>
                            <Text style={styles.title}>Non Conforme</Text>
                            <View style={styles.listEffectifs}>
                                <Text>Imputations : </Text>
                                {report.proprete_commune_imputation.map(proprete =>
                                    <View style={styles.listEffectifs}>
                                        <Text
                                            style={styles.textEffectifsNomEntreprise}>{proprete.company.nom + ' :' + proprete.pourcent + ' %'}
                                        </Text>
                                        <Text
                                            style={styles.textEffectifsInfos}>{'Commentaire :' + proprete.commentaire}
                                        </Text>

                                    </View>
                                )}
                            </View>
                        </View>
                    }
                </View>
            </Page>

        </Document>
    );
};

export default ReportPdfComponent;
