import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../forms/Button";
import { statusEcheanceClasses, statusEcheanceLabel } from "../ProjectStatus";
import DateAPI from "../../services/DateAPI";

const EcheanceModal = ({ project }) => {
  const [showEcheanceModal, setShowEcheanceModal] = useState(false);

  return (
    <>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showEcheanceModal}
        onHide={() => setShowEcheanceModal(!showEcheanceModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liste des Échéances</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {project.lots.map((lot) => (
            <React.Fragment key={lot.id}>
              {lot.echeances.length !== 0 && (
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
                        <th>Rédacteur</th>
                        <th>Statut</th>
                        <th>Sujet</th>
                        <th>Début</th>
                        <th>Echéance</th>
                        <th>Clotûre</th>
                        <th>Retard</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lot.echeances.map((echeance) => (
                        <tr key={echeance.id}>
                          <td>{echeance.redacteur}</td>
                          <td>
                            <span
                              className={
                                "badge badge-" +
                                statusEcheanceClasses(
                                  echeance.dateDebut,
                                  echeance.dateCloture,
                                  echeance.dateFinPrevue
                                )
                              }
                            >
                              {statusEcheanceLabel(
                                echeance.dateDebut,
                                echeance.dateCloture,
                                echeance.dateFinPrevue
                              )}
                            </span>
                          </td>
                          <td>{echeance.sujet}</td>
                          <td>{DateAPI.formatDate(echeance.dateDebut)}</td>
                          <td>{DateAPI.formatDate(echeance.dateFinPrevue)}</td>
                          <td>{DateAPI.formatDate(echeance.dateCloture)}</td>
                          <td>
                            {DateAPI.retard(
                              echeance.dateCloture,
                              echeance.dateFinPrevue
                            ) > 0 &&
                              DateAPI.retard(
                                echeance.dateCloture,
                                echeance.dateFinPrevue
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr />
                </>
              )}
            </React.Fragment>
          ))}
        </Modal.Body>
      </Modal>
      <Button
        text="Voir les échéances"
        className="btn btn-primary mx-2 mb-3"
        type="button"
        onClick={() => setShowEcheanceModal(!showEcheanceModal)}
      />
    </>
  );
};

export default EcheanceModal;
