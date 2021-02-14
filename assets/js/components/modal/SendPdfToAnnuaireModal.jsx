import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import CompanyAPI from "../../services/CompanyAPI";
import Button from "../forms/Button";

const SendPdfToAnnuaireModal = ({ lots }) => {
  const [showModal, setShowModal] = useState(false);
  const [showValidate, setShowValidate] = useState(false);
  const [companys, setCompanys] = useState([]);
  const [destinataires, setDestinataires] = useState([]);

  //   -----------------------------------------------FUNCTIONS----------------------------------------

  const fetchAnnuaires = () => {
    const unFilteredCompanys = lots.map((l) => JSON.stringify(l.company));
    const tempFilteredCompanys = [...new Set(unFilteredCompanys)];
    const filteredCompanys = tempFilteredCompanys.map((c) => JSON.parse(c));
    const compagnies = [];

    filteredCompanys.map((c) => {
      try {
        CompanyAPI.getAnnuaire(c.id).then((r) => {
          compagnies.push({ id: c.id, nom: c.nom, annuaire: r });
        });
      } catch (e) {
        console.log(e);
        console.log(e.response);
      }
    });
    setCompanys(compagnies);
    setTimeout(() => {
      const tempDestinataires = [];
      compagnies.map((c) => {
        for (let a = 0; a < c.annuaire.length; a++) {
          tempDestinataires.push(c.annuaire[a].email);
        }
      });
      setDestinataires(tempDestinataires);
    }, filteredCompanys.length * 1000);
  };

  useEffect(() => {
    fetchAnnuaires();
  }, []);

  const handleCheck = ({ currentTarget }) => {
    const tr = currentTarget;
    if (tr.classList.contains("table-success")) {
      const updatedDestinataires = [...destinataires];
      const id = updatedDestinataires.findIndex((e) => e == tr.id);
      updatedDestinataires.splice(id, 1);
      setDestinataires(updatedDestinataires);
    } else {
      setDestinataires([...destinataires, tr.id]);
    }
  };

  const handleSubmit = () => {
    if (destinataires.length === 0) {
      toast.info("Vous devez selectionner des destinataires");
    } else {
      try {
        toast.success("Emails envoyés");
      } catch (e) {
        toast.error("Une erreur èst survenue, merci de reessayer plus tard");
        console.log(e);
      }
    }
  };

  //   ----------------------------------------------TEMPLATE--------------------------------------------------

  return (
    <>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {showValidate ? "Aperçu avant envoi" : "Choix des destinataires"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showValidate ? (
            <>
              {companys.map((company) => (
                <React.Fragment key={company.id}>
                  <h5 className="ml-5">{company.nom}</h5>
                  <table className="table table-hover col-8 mx-auto">
                    <tbody>
                      {company.annuaire &&
                        company.annuaire.map((contact) => (
                          <tr
                            // className="table-success"
                            className={
                              destinataires.includes(contact.email)
                                ? "table-success"
                                : ""
                            }
                            id={contact.email}
                            key={contact.id}
                            onClick={handleCheck}
                          >
                            <td className="w-25">{contact.nom}</td>
                            <td className="w-25">{contact.email}</td>
                            <td className="d-flex justify-content-end">
                              <div className="custom-control custom-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  readOnly
                                  checked={destinataires.includes(
                                    contact.email
                                  )}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <h5 className="ml-5">
                Destinataires du mail
              </h5>
              <div className=" d-flex justify-content-center">
                {destinataires.length === 0 ? (
                  <div>Vous n'avez selectionnez aucun destinataire</div>
                ) : (
                  <ul className="list-group mb-5 col-6">
                    {destinataires.map((d, k) => (
                      <li className="list-group-item" key={k}>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
          <div
            className={
              "d-flex justify-content-" + (showValidate ? "between" : "end")
            }
          >
            <Button
              type="button"
              className={"btn btn-" + (showValidate ? "danger" : "primary")}
              onClick={() => setShowValidate(!showValidate)}
              text={showValidate ? "Retour" : "Valider"}
            />
            {showValidate && (
              <Button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                text="Envoyer"
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Button
        text="Clôturer et envoyer"
        className="btn btn-primary mr-4"
        type="button"
        onClick={() => setShowModal(!showModal)}
      />
    </>
  );
};

export default SendPdfToAnnuaireModal;
