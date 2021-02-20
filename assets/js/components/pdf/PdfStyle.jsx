import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      paddingBottom: 60
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
      margin:10,
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
      fontSize:10
    },
    textEffectifsInfos: {
      marginLeft: "40pt",
      fontSize:10
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
      height: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    projectImage: {
      width: "60%",
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

  export default styles