import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import DateAPI from "../../services/DateAPI";
import EcheanceAPI from "../../services/EcheanceAPI";
import Button from "../forms/Button";
import Field from "../forms/Field";
import FieldTextArea from "../forms/FieldTextArea";
import SpanStatusEcheance from "../span/SpanStatusEcheance";
import useIsMountedRef from "../UseIsMountedRef";

const EcheanceDetailModal = ({
  echeanceError,
  setEcheanceError,
  echeanceErrorModel,
  report,
  urlParams,
  fetchLots,
  echeanceId
}) => {
  const [edit, setEdit] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [echeanceDetail, setEcheanceDetail] = useState({});
  const isMountedRef = useIsMountedRef();

  const fetchEcheance = async (id) => {
    try {
      const data = await EcheanceAPI.findEcheance(id);
      if (isMountedRef.current) {
        setEcheanceDetail(data);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement de l'échéance");
      console.log(error.response);
    }
  };

  const handleChangeEcheanceDetail = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setEcheanceDetail({ ...echeanceDetail, [name]: value });
  };

  const handleShowModalDetail = async (id) => {
    if (!showModalDetail) {
      await fetchEcheance(id);
      setEdit(false);
    } else {
      setEcheanceError(echeanceErrorModel);
    }
    setShowModalDetail(!showModalDetail);
  };

  const handleSubmitDeleteEcheance = async (idEcheance) => {
    try {
      await EcheanceAPI.deleteEcheance(idEcheance);
      toast.success("Écheance supprimée.");
      fetchLots(urlParams.id);
      setShowModalDetail(false);
    } catch (error) {
      toast.success("Erreur lors de la suppression de l'écheance.");
    }
  };

  const handleSubmitChangeEcheance = async (event) => {
    event.preventDefault();
    if (
      DateAPI.dateIsAfterDebut(
        echeanceDetail.dateFinPrevue,
        echeanceDetail.dateDebut
      )
    ) {
      try {
        echeanceDetail.lot = "/api/lots/" + echeanceDetail.lot.id;

        await EcheanceAPI.update(echeanceDetail.id, echeanceDetail);
        toast.success("L'échéance est bien modifiée !");
        setEcheanceDetail({});
        fetchLots(urlParams.id);
        setShowModalDetail(!showModalDetail);
      } catch ({ reponse }) {
        const { violations } = response.data;
        if (violations) {
          const apiErrors = {};
          violations.map(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setEcheanceError(apiErrors);
        }
        console.log(error.response);
      }
    } else {
      setEcheanceError({
        ...echeanceError,
        dateFinPrevue: "Veuillez entrer une date posterieur",
      });
    }
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalDetail}
        onHide={handleShowModalDetail}
      >
        <Modal.Header closeButton>
          <h2>Detail de l'échéance N° {echeanceDetail.id}</h2>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitChangeEcheance}>
            <div className="container d-flex  flex-wrap justify-content-around">
              <div className="col-12 d-flex justify-content-around border-detail">
                <p>Redacteur: {echeanceDetail.redacteur} </p>
                {echeanceDetail.lot && (
                  <p>N° Lot: {echeanceDetail.lot.numeroLot} </p>
                )}
              </div>
              <div className="col-5 mt-3 border-detail d-flex flex-column justify-content-center">
                <p>
                  Libellé :{echeanceDetail.lot && echeanceDetail.lot.libelleLot}
                </p>
                {!edit ? (
                  <>
                    <p>Zone: {echeanceDetail.zone} </p>
                    <p>Sujet: {echeanceDetail.sujet} </p>
                  </>
                ) : (
                  <>
                    <Field
                      name="zone"
                      label="Zone"
                      type="text"
                      onChange={handleChangeEcheanceDetail}
                      value={echeanceDetail.zone}
                    ></Field>
                    <Field
                      name="sujet"
                      label="Sujet"
                      type="text"
                      onChange={handleChangeEcheanceDetail}
                      value={echeanceDetail.sujet}
                      required={true}
                    ></Field>
                  </>
                )}
                <p>
                  Statut:
                  <SpanStatusEcheance
                    objet={echeanceDetail}
                  ></SpanStatusEcheance>
                </p>
              </div>
              {edit ? (
                <div className="col-5 mt-3 border-detail">
                  <Field
                    name="dateDebut"
                    label="Date de debut:"
                    type="date"
                    onChange={handleChangeEcheanceDetail}
                    value={DateAPI.formatDateForm(echeanceDetail.dateDebut)}
                  ></Field>
                  <Field
                    name="dateFinPrevue"
                    label="Date de fin prevue:"
                    type="date"
                    onChange={handleChangeEcheanceDetail}
                    error={echeanceError.dateFinPrevue}
                    value={DateAPI.formatDateForm(echeanceDetail.dateFinPrevue)}
                  ></Field>
                  <Field
                    name="dateCloture"
                    label="Date de cloture:"
                    type="date"
                    onChange={handleChangeEcheanceDetail}
                    value={DateAPI.formatDateForm(echeanceDetail.dateCloture)}
                  ></Field>
                </div>
              ) : (
                <div className="col-5 mt-3 border-detail">
                  <p className="mt-3">
                    Debut: {DateAPI.formatDate(echeanceDetail.dateDebut)}
                  </p>
                  <p>
                    Fin prévue:
                    {DateAPI.formatDate(echeanceDetail.dateFinPrevue)}
                  </p>

                  <p>
                    Fini le: {DateAPI.formatDate(echeanceDetail.dateCloture)}
                  </p>
                  {DateAPI.retard(
                    echeanceDetail.dateCloture,
                    echeanceDetail.dateFinPrevue,
                    report.dateRedaction
                  ) > 0 && (
                    <p>
                      Retard:
                      {DateAPI.retard(
                        echeanceDetail.dateCloture,
                        echeanceDetail.dateFinPrevue,
                        report.dateRedaction
                      )}
                    </p>
                  )}
                </div>
              )}
              <div className="col-12 border-detail mt-3">
                {echeanceDetail.lot && (
                  <p className="mt-3">
                    Entreprise en charge: {echeanceDetail.lot.company.nom}
                  </p>
                )}

                <p>Effectif prévu: {echeanceDetail.effectifPrevu}</p>
                <p>Effectif constaté: {echeanceDetail.effectifConstate}</p>
              </div>
              <fieldset className="border-fieldset col-12">
                <legend>Commentaires</legend>
                <FieldTextArea
                  id="commentDetailArea"
                  value={echeanceDetail.comment}
                  name="comment"
                  placeholder="Commentaire"
                  onChange={handleChangeEcheanceDetail}
                  rows={
                    echeanceDetail.comment &&
                    echeanceDetail.comment.split("\n").length + 1
                  }
                  readOnly={!edit && true}
                />
              </fieldset>

              {edit && (
                <div className="col-12 mt-3 d-flex justify-content-between">
                  <Button
                    className="btn btn-danger"
                    text="Supprimer"
                    type="button"
                    onClick={()=>handleSubmitDeleteEcheance(echeanceDetail.id)}
                  />
                  <Button className="btn btn-success" text="Valider" />
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {!edit ? (
            <Button
              type="button"
              className="btn btn-primary"
              text="Modifier"
              onClick={()=>setEdit(!edit)}
            />
          ) : (
            <>
              <Button
                type="button"
                className="btn btn-danger"
                text="Annuler"
                onClick={()=>setEdit(!edit)}
              />
            </>
          )}
        </Modal.Footer>
      </Modal>
      <Button
        type="button"
        className="btn btn-primary"
        text="Détails"
        onClick={() => handleShowModalDetail(echeanceId)}
      />
    </>
  );
};
export default EcheanceDetailModal;
