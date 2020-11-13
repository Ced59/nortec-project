import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../forms/Button";
import Select from "../forms/Select";
import Field from "../forms/Field";
import DateAPI from "../../services/DateAPI";
import AuthAPI from "../../services/AuthAPI";
import EcheanceAPI from "../../services/EcheanceAPI";
import { toast } from "react-toastify";

const AddEcheanceModal = ({
  project,
  loading,
  echeanceError,
  setEcheanceError,
  echeanceErrorModel,
  fetchProject,
  urlParams,
}) => {
  const [echeance, setEcheance] = useState({
    numeroEcheance: "",
    redacteur: AuthAPI.getUserFirstNameLastName(),
    // categorie: "",
    sujet: "",
    lot: "",
    report: [],
  });

  const echeanceModel = {
    numeroEcheance: "",
    redacteur: AuthAPI.getUserFirstNameLastName(),
    // categorie: "",
    sujet: "",
    lot: "",
    report: [],
  };

  const [echeanceLotError, setEcheanceLotError] = useState({
    lot: "",
  });

  const [showModalEcheance, setShowModalEcheance] = useState(false);

  //   --------------------------------------------------FUNCTION-------------------------------------------

  const handleShowModalEcheance = () => {
    setEcheance(echeanceModel);
    setShowModalEcheance(!showModalEcheance);
    if (!showModalEcheance) {
      setEcheanceError(echeanceErrorModel);
      setEcheanceLotError({ ...echeanceLotError, lot: "" });
    }
  };

  const handleChangeEcheance = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheance({ ...echeance, [name]: value });
  };

  const handleSubmitAddEcheance = async (event) => {
    event.preventDefault();
    echeance.numeroEcheance = Number(echeance.numeroEcheance);
    try {
      console.log(echeance);

      await EcheanceAPI.create(echeance);

      toast.success("L'échéance est bien ajouté !");
      fetchProject(urlParams.id);
      handleShowModalEcheance();
    } catch (error) {
      console.log(error.response);
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setEcheanceError(apiErrors);
      }
      if (echeance.lot === "") {
        setEcheanceLotError({
          ...echeanceLotError,
          lot: "Veuillez choisir un lot",
        });
      } else {
        setEcheanceLotError({ ...echeanceLotError, lot: "" });
      }
      if (echeance.numeroEcheance === 0) {
        setEcheanceError({
          ...echeanceError,
          numeroEcheance: "Veuillez entrer un numero",
        });
        setEcheance({ ...echeance, numeroEcheance: "" });
      }
      console.log(response);
    }
  };

  return (
    //   -----------------------------------------------TEMPLATE-----------------------------------------------
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalEcheance}
        onHide={handleShowModalEcheance}
      >
        {!loading && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter une échéance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitAddEcheance}>
                <Select
                  name="lot"
                  label="Lot"
                  onChange={handleChangeEcheance}
                  value={echeance.lot}
                  error={echeanceLotError.lot}
                >
                  <option value="">Selectionnez le lot</option>
                  {project.lots &&
                    project.lots.map((lot) => (
                      <option key={lot.id} value={"/api/lots/" + lot.id}>
                        {lot.company.nom}
                      </option>
                    ))}
                </Select>
                <Field
                  name="zone"
                  label="Zone"
                  onChange={handleChangeEcheance}
                  value={echeance.zone}
                  error={echeanceError.zone}
                ></Field>
                <Field
                  name="sujet"
                  label="Sujet"
                  onChange={handleChangeEcheance}
                  value={echeance.sujet}
                  error={echeanceError.sujet}
                ></Field>
                <Field
                  name="dateDebut"
                  label="Date de début"
                  type="date"
                  onChange={handleChangeEcheance}
                  value={DateAPI.formatDateForm(echeance.dateDebut)}
                  error={echeanceError.dateDebut}
                ></Field>
                <Field
                  name="dateFinPrevue"
                  label="Date de fin prévue"
                  type="date"
                  onChange={handleChangeEcheance}
                  value={DateAPI.formatDateForm(echeance.dateFinPrevue)}
                  error={echeanceError.dateFinPrevue}
                ></Field>
                <Field
                  name="effectifPrevu"
                  label="Effectif Prévu"
                  type="number"
                  onChange={handleChangeEcheance}
                  value={echeance.effectifPrevu}
                ></Field>
                <Modal.Footer>
                  <Button className="btn btn-primary" text="Ajouter"></Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </>
        )}
      </Modal>
      <Button
        className="btn btn-primary"
        text="Ajouter une échéance"
        onClick={() => handleShowModalEcheance()}
      />
    </>
  );
};

export default AddEcheanceModal;
