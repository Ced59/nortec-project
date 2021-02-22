import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import "../../css/app.css";
import { toast } from "react-toastify";
import ReportsAPI from "../services/ReportsAPI";
import ReportImputation from "../components/ReportImputation";
import ReportComment from "../components/ReportComment";
import ReportAddPhoto from "../components/ReportAddPhoto";
import CardConformity from "../components/CardConformity";
import ImputationTitle from "../components/wrapper/ImputationTitle";
import useIsMountedRef from "../components/UseIsMountedRef";
import handleSubmitConformity from "../components/ReportConformity";
import ProjectsAPI from "../services/ProjectsAPI"

const ReportPropreteAccesPage = ({ match }) => {
  const [conforme, setConforme] = useState("noconform");
  const NavbarLeftWithRouter = withRouter(NavbarLeft);
  const [imputations, setImputations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editImput, setEditImput] = useState();
  const [report, setReport] = useState({});
  const isMountedRef = useIsMountedRef();
  const imputationsRef = useRef([]);
  const urlParams = match.params;

  // -------------------------------------------------------function------------------------------------------------

  const fetchReport = async (id) => {
    imputationsRef.current = [];
    try {
      const data = await ReportsAPI.findReport(id);
      if (isMountedRef.current) {
        setReport(data);
        setConforme(data.propreteAccessConformity);
        // ----------------------------------------------create new imputations-------------
        if (data.propreteAccessImputation == 0) {
          setEditImput(false);
          const lots = await ProjectsAPI.getLots(urlParams.id);
          imputationsRef.current = lots.map((imput) =>
            JSON.stringify({
              companyName: imput.company.nom,
              company: "/api/companies/" + imput.company.id,
              report: "/api/reports/" + urlParams.idReport,
              pourcent: 0,
            })
          );
          imputationsRef.current = [...new Set(imputationsRef.current)];
          imputationsRef.current = imputationsRef.current.map((imputation) =>
            JSON.parse(imputation)
          );
          setImputations(imputationsRef.current);
          // ----------------------------------------------format existing imputations-------------
        } else {
          setEditImput(true);
          imputationsRef.current = data.propreteAccessImputation.map(
            (imput) => ({
              idImput: imput.id,
              companyName: imput.company.nom,
              company: "/api/companies/" + imput.company.id,
              report: "/api/reports/" + urlParams.idReport,
              pourcent: imput.pourcent,
            })
          );
          setImputations(imputationsRef.current);
        }
        setLoading(false);
      }
      // ---------------------------------------------
    } catch (error) {
      toast.error("Erreur lors du chargement du rapport");
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchReport(urlParams.idReport);
  }, [urlParams.id, urlParams.idReport]);

  // ----------------------------------------------------template-------------------------------------------------------------

  return (
    <main className="container">
      <NavbarLeftWithRouter selected="proprete" />
      {!loading && (
        <div className="page-content">
          <ImputationTitle title={"Propreté des accès :"}>
            <Button
              onClick={() => setConforme("conform")}
              className="btn btn-success mb-4"
              text="Conforme"
              type="button"
            />

            <Button
              onClick={() => setConforme("noconform")}
              className="btn btn-danger ml-5 mb-4"
              text="Non Conforme"
              type="button"
            />
          </ImputationTitle>

          {conforme === "conform" && (
            <CardConformity
              titre="Propreté des accès conforme ?"
              submit={() =>
                handleSubmitConformity(
                  "propreteAccessConformity",
                  conforme,
                  fetchReport,
                  urlParams.idReport
                )
              }
            />
          )}
          {conforme === "prorata" && (
            <CardConformity
              titre="Propreté des accès au prorata ?"
              submit={() =>
                handleSubmitConformity(
                  "propreteAccessConformity",
                  conforme,
                  fetchReport,
                  urlParams.idReport
                )
              }
            />
          )}
          {conforme === "noconform" && (
            <>
              <Button
                onClick={() => setConforme("prorata")}
                className="btn btn-warning ml-5 mb-4"
                text="Prorata"
                type="button"
              />
              <ReportImputation
                setLoading={setLoading}
                setImputations={setImputations}
                imputations={imputations}
                editImput={editImput}
                fetchReport={fetchReport}
                urlParams={urlParams}
                api={"propreteAcces"}
              />
              <ReportAddPhoto
                reportID={urlParams.idReport}
                typePhoto="access"
              />
              <ReportComment
                setReport={setReport}
                report={report}
                valueComment={report.propreteAccessComment}
                nameComment="propreteAccessComment"
                valueCommentIntern={report.propreteAccessCommentIntern}
                nameCommentIntern="propreteAccessCommentIntern"
                fetchReport={fetchReport}
                idReport={urlParams.idReport}
              />
              <div className="d-flex justify-content-center">
                <Button
                  onClick={() =>
                    handleSubmitConformity(
                      "propreteAccessConformity",
                      conforme,
                      fetchReport,
                      urlParams.idReport
                    )
                  }
                  className="btn btn-primary"
                  text="Confirmer"
                  type="button"
                  name="conformity"
                />
              </div>
            </>
          )}
        </div>
      )}
      {loading && <div id="loading-icon" />}
    </main>
  );
};

export default ReportPropreteAccesPage;
