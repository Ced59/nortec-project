import React, { useState, useEffect } from "react";
import AuthAPI from "../services/AuthAPI";
import ProjectsAPI from "../services/ProjectsAPI";
import Modal from "react-bootstrap/Modal";
import Button from "../components/forms/Button";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { toast } from "react-toastify";
import useClippy from "use-clippy";

const LotModal = ({ loadingProject, project, fetchProject }) => {
  const [lotsModel] = useState({
    numeroLot: "",
    libelleLot: "",
    DateDebutEcheance: "1900-01-01",
    dateFinEcheance: "1900-01-01",
    company: "",
    project: "",
    annuaire: "/api/annuaires/51",
  });

  const [lots, setLots] = useState({
    numeroLot: "",
    libelleLot: "",
    DateDebutEcheance: "1900-01-01",
    dateFinEcheance: "1900-01-01",
    company: "",
    project: "",
    annuaire: "/api/annuaires/51",
  });
  const [showLotModal, setShowLotModal] = useState(false);
  const [showLotDetail, setShowLotDetail] = useState(false);
  const [addLot, setAddLot] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [clipboard, setClipboard] = useClippy();

  //   --------------------------------------------------FUNCTION-------------------------------------------

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleClipboard = ({ currentTarget }) => {
    const value = currentTarget.innerText;
    setClipboard(value);
    console.log(value);
    toast.info("Copié dans le presse-papier");
  };

  const fetchCompany = async () => {
    try {
      const data = await ProjectsAPI.findAllCompany();
      setCompanies(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleShowLotModal = () => {
    setShowLotModal(!showLotModal);
    setAddLot(false);
    setShowLotDetail(false);
    if (showLotModal) {
      fetchCompany().then((r) => "");
      console.log(companies);
    } else {
      setLots(lotsModel);
    }
  };

  const handleShowLotDetail = () => {
    setShowLotDetail(!showLotDetail);
  };

  const handleShowAddLot = () => {
    setAddLot(!addLot);
    setLots(lotsModel);
  };

  const handleChangeLot = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setLots({ ...lots, [name]: value });
  };

  const handleSubmitLot = async (event) => {
    event.preventDefault();

    setAddLot(false);

    try {
      lots.project = "/api/projects/" + project.id;
      lots.company = "/api/companies/" + lots.company;

      console.log(lots);

      await ProjectsAPI.addLotProject(lots);

      toast.success("Le lot est bien ajouté !");
    } catch (error) {
      console.log(error);
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setError(apiErrors);
      }
    }
    fetchProject(project.id);
    setLots(lotsModel);
  };

  return (
    //   -----------------------------------------------TEMPLATE-----------------------------------------------
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showLotModal}
        onHide={handleShowLotModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liste des lots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showLotDetail && (
            <>
              {AuthAPI.isAdmin() && !addLot && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleShowAddLot()}
                >
                  Ajouter un lot
                </button>
              )}
              {!addLot && (
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Numéro de lot</th>
                      <th>Intitulé du lot</th>
                      <th>Entreprise</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {!loadingProject &&
                      project.lots.map((lot) => (
                        <tr key={lot.id}>
                          <td>{lot.numeroLot}</td>
                          <td>{lot.libelleLot}</td>
                          <td>{lot.company && lot.company.nom}</td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              text="Détails"
                              onClick={handleShowLotDetail}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          )}
          {showLotDetail && (
            <>
              <Button
                className="btn btn-primary"
                text="Fermer les détails"
                onClick={handleShowLotDetail}
              />
            </>
          )}
          {addLot && (
            <form>
              <Field
                className="m-auto"
                name="numeroLot"
                label="Numéro de Lot"
                onChange={handleChangeLot}
                value={lots.numeroLot}
              />
              <Field
                name="libelleLot"
                label="Nom du Lot"
                onChange={handleChangeLot}
                value={lots.libelleLot}
              />
              <Select
                name="company"
                label="Entreprise"
                onChange={handleChangeLot}
                value={lots.company}
                error=""
              >
                {!lots.company && (
                  <option value="notSet">Selectionnez une entreprise</option>
                )}
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.nom}
                  </option>
                ))}
              </Select>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  onClick={handleShowAddLot}
                  className="btn btn-danger"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmitLot}
                  className="btn btn-success"
                >
                  Valider
                </button>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleShowLotModal}>
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
      <Button
        text="Gérer les lots"
        className="btn btn-primary mx-2 mb-3"
        type="button"
        onClick={handleShowLotModal}
      />
    </>
  );
};

export default LotModal;
