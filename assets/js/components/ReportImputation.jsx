import React from "react";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import SecuriteConformityAPI from "../services/SecuriteConformityAPI";
import PropreteAccesAPI from "../services/PropreteAccesAPI";
import PropreteCommunAPI from "../services/PropreteCommunAPI";
import { toast } from "react-toastify";

const ReportImputation = ({
  setLoading,
  editImput,
  setImputations,
  imputations,
  fetchReport,
  urlParams,
  api,
}) => {
  const create = {
    propreteAcces: PropreteAccesAPI.createPropreteAccessImputations,
    propreteCommun: PropreteCommunAPI.createCommunImputations,
    securite: SecuriteConformityAPI.createSecuriteImputations,
  };
  const update = {
    propreteAcces: PropreteAccesAPI.updatePropreteAccessImputations,
    propreteCommun: PropreteCommunAPI.updateCommunImputations,
    securite: SecuriteConformityAPI.updateSecuriteImputations,
  };

  // -------------------------------------------------function------------------------------------------

  const handleChangeImputations = ({ currentTarget }) => {
    const { value, id, name } = currentTarget;
    const copyImputations = [...imputations];

    const newImput = copyImputations[id];
    newImput[name] = value;
    if (name == "percent" || name == "pourcent") {
      newImput[name] = Number(value);
    }

    copyImputations.splice(id, 1, newImput);
    setImputations(copyImputations);
  };

  const imputationsSent = () => {
          toast.success(!editImput?"Imputations créées":"Imputations misent à jour");
          fetchReport(urlParams.idReport);
  };

  const handleSubmitImput = () => {
    setLoading(true);
    try {
      if (!editImput) {
        Promise.all(
          imputations.map(async (imput) => await create[api](imput))
        ).then(response=>{
          console.log(response);
          imputationsSent();
        }).catch ((e)=>{
          console.log(e);
          console.log(e.response);
        });
      } else {
        Promise.all(
          imputations.map(
            async (imput) => await update[api](imput, imput.idImput))
        ).then(response=>{
          console.log(response);
          imputationsSent();
        }).catch ((e)=>{
          console.log(e);
          console.log(e.response);
        });
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };

  // -------------------------------------------------template------------------------------------------

  return (
    <form className="col-8">
        {imputations &&
          imputations.map((imputation, i) => (
            <React.Fragment key={i}>
              {api == "propreteAcces" && (
                <div className="row" key={i}>
                  <h5 className="col-9">{imputation.companyName}</h5>
                  <input
                    value={imputations[i].pourcent}
                    className="form-control col-2 mb-1"
                    name="pourcent"
                    onChange={handleChangeImputations}
                    id={i}
                  />
                  <h5 className="col-1 mb-1">%</h5>
                </div>
              )}
              {api == "propreteCommun" && (
                <div className="row d-flex flex-row align-items-center" key={i}>
                  <h5 className="col-5">{imputation.companyName}</h5>

                  <FieldTextArea
                    value={imputation.commentaire}
                    className="form-control col-6 mb-1 mr-1"
                    name="commentaire"
                    onChange={handleChangeImputations}
                    id={i}
                  />
                  <input
                    value={imputation.percent}
                    className="form-control col-2 mb-1 ml-1 mt-4"
                    name="percent"
                    onChange={handleChangeImputations}
                    id={i}
                  />
                  <h5>%</h5>
                </div>
              )}
              {api == "securite" && (
                <div className="d-flex flex-row align-items-center" key={i}>
                  <h5 className="col-7">{imputation.companyName}</h5>

                  <FieldTextArea
                    value={imputations[i].commentaire}
                    className="form-control mb-1"
                    name="commentaire"
                    onChange={handleChangeImputations}
                    id={i}
                  />
                </div>
              )}
            </React.Fragment>
          ))}

        <Button
          onClick={handleSubmitImput}
          className="btn btn-info offset-9 col3 mb-4 mt-3"
          text="Valider les imputations"
          type="button"
        />
    </form>
  );
};

export default ReportImputation;
