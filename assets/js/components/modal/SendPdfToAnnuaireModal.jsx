import { pdf } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import AuthAPI from "../../services/AuthAPI";
import CompanyAPI from "../../services/CompanyAPI";
import MailAPI from "../../services/MailAPI";
import ReportsAPI from "../../services/ReportsAPI";
import Button from "../forms/Button";
import ReportPdfComponent from "../pdf/ReportPdfComponent";

const SendPdfToAnnuaireModal = ({
  lots,
  users,
  reportChrono,
  projectName,
  project,
  report,
  photos,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [companys, setCompanys] = useState([]);
  const [destinataires, setDestinataires] = useState([]);
  const [usersContact, setUsersContact] = useState([]);

  //   -----------------------------------------------FUNCTIONS----------------------------------------

  const fetchAnnuaires = () => {
    const unFilteredCompanys = lots.map((l) => JSON.stringify(l.company));
    const tempFilteredCompanys = [...new Set(unFilteredCompanys)];
    const filteredCompanys = tempFilteredCompanys.map((c) => JSON.parse(c));
    const compagnies = [];
    // const tempDestinataires = [];

    filteredCompanys.map((c) => {
      try {
        CompanyAPI.getAnnuaire(c.id).then((r) => {
          compagnies.push({ id: c.id, nom: c.nom, annuaire: r });
          // r.forEach((d) => {
          //   tempDestinataires.push(d.email);
          // });
        });
      } catch (e) {
        console.log(e);
        console.log(e.response);
      }
    });
    setCompanys(compagnies);
    // setDestinataires(tempDestinataires);
  };

  const fetchUsersEmail = () => {
    const tempUsers = [];
    users.forEach((u) => {
      tempUsers.push(u);
    });
    setUsersContact(tempUsers);
  };

  useEffect(() => {
    fetchAnnuaires();
    fetchUsersEmail();
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

  const handleSubmit = async () => {
    if (destinataires.length !== 0) {
      const pdfToBlob = pdf(
        <ReportPdfComponent report={report} project={project} photos={photos} />
      );
      const blob = await pdfToBlob.toBlob();

      const formData = new FormData();
      formData.append("pdf", blob);
      formData.append("projectName", projectName);
      formData.append("reportChrono", reportChrono);
      formData.append("destinataires", destinataires);

      try {
        const data = formData;
        MailAPI.sendPDF(data).then((r) => {
          const reportStatus={status:"sent"};
          ReportsAPI.update(report.id,reportStatus);
          toast.success("Emails envoyés");
        });
      } catch (e) {
        toast.error("Une erreur est survenue, merci de reessayer plus tard");
        console.log(e);
        console.log(e.response);
      }
    } else {
      toast.info("Vous devez selectionner des destinataires");
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
        onHide={() => {
          setShowModal(!showModal);
          setModalStep(1);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalStep == 3
              ? "Liste des destinataires"
              : "Choix des destinataires"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalStep == 1 && ( // CHOIX CONTACTS ENTREPRISES
            <>
              <h4 className="text-center">Contacts d'entreprise</h4>
              {companys.map((company) => (
                <React.Fragment key={company.id}>
                  <h5 className="ml-5">{company.nom}</h5>
                  <table className="table table-hover col-8 mx-auto">
                    <tbody>
                      {company.annuaire &&
                        company.annuaire.map((contact) => (
                          <tr
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
          )}
          {modalStep == 2 && ( // CHOIX CONTACTS UTILISATEUR
            <>
              <h4 className="text-center">Contacts utilisateurs</h4>
              <h5 className="ml-5">Administrateurs</h5>
              <table className="table table-hover col-8 mx-auto">
                <tbody>
                  {usersContact.map((contact) => (
                    <React.Fragment key={contact.id}>
                      {contact.roles[0] == "ROLE_ADMIN" && (
                        <tr
                          className={
                            destinataires.includes(contact.email)
                              ? "table-success"
                              : ""
                          }
                          id={contact.email}
                          onClick={handleCheck}
                        >
                          <td className="w-25">
                            {contact.lastName} {contact.firstName}
                          </td>
                          <td className="w-25">{contact.email}</td>
                          <td className="d-flex justify-content-end">
                            <div className="custom-control custom-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                readOnly
                                checked={destinataires.includes(contact.email)}
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <h5 className="ml-5">Utilisateurs</h5>
              <table className="table table-hover col-8 mx-auto">
                <tbody>
                  {usersContact.map((contact) => (
                    <React.Fragment key={contact.id}>
                      {contact.roles[0] == "ROLE_USER" && (
                        <tr
                          className={
                            destinataires.includes(contact.email)
                              ? "table-success"
                              : ""
                          }
                          id={contact.email}
                          onClick={handleCheck}
                        >
                          <td className="w-25">
                            {contact.lastName} {contact.firstName}
                          </td>
                          <td className="w-25">{contact.email}</td>
                          <td className="d-flex justify-content-end">
                            <div className="custom-control custom-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                readOnly
                                checked={destinataires.includes(contact.email)}
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {modalStep == 3 && ( // AFFICHAGE DE TOUT LES CONTACTS SELECTIONNES
            <>
              <h5 className="ml-5">Destinataires du mail</h5>
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
              "d-flex justify-content-" + (modalStep == 1 ? "end" : "between")
            }
          >
            {modalStep > 1 && (
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => setModalStep(modalStep - 1)}
                text="Retour"
              />
            )}
            {modalStep < 3 && (
              <Button
                type="button"
                className="btn btn-primary"
                onClick={() => setModalStep(modalStep + 1)}
                text="Suivant"
              />
            )}
            {modalStep == 3 && (
              <Button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                text="Valider"
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
      {AuthAPI.isRole()==="Administrateur" && (
      <Button
        text={report.status !=="sent" ? "Clôturer et envoyer": "Renvoyer"}
        className="btn btn-primary mr-4"
        type="button"
        onClick={() => setShowModal(!showModal)}
      />
      )}
    </>
  );
};

export default SendPdfToAnnuaireModal;
