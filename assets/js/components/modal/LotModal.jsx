import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthAPI from "../../services/AuthAPI";
import ProjectsAPI from "../../services/ProjectsAPI";
import Modal from "react-bootstrap/Modal";
import Button from "../forms/Button";
import Field from "../forms/Field";
import Select from "../forms/Select";
import { toast } from "react-toastify";
import useClippy from "use-clippy";

const LotModal = ({ loadingProject, project, fetchProject }) => {
  const [lotsModel] = useState({
    numeroLot: "",
    libelleLot: "",
    company: "",
    project: "",
  });

  const [lots, setLots] = useState({
    numeroLot: "",
    libelleLot: "",
    company: "",
    project: "",
  });
  const [showLotModal, setShowLotModal] = useState(false);
  const [showLotDetail, setShowLotDetail] = useState(false);
  const [lotDetail, setLotDetail] = useState([]);
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
    } else {
      setLots(lotsModel);
    }
  };

  const handleShowLotDetail = (lot) => {
    if (!showLotDetail) {
      setLotDetail(lot);
    }
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
        <Modal.Title>
          {!showLotDetail ? "Liste des lot" : "Détails"}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showLotDetail && (
            <>
              {AuthAPI.isAdmin() && !addLot && (
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleShowAddLot()}
                  text="Ajouter un lot"
                />
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
                                type="button"
                              className="btn btn-primary"
                              text="Détails"
                              onClick={() => handleShowLotDetail(lot)}
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
              <h4>{lotDetail.company && lotDetail.company.nom}</h4>
              <h5>Lot {lotDetail.id} : {lotDetail.libelleLot}</h5>
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Contact</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">N° téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {lotDetail.company && lotDetail.company.annuaires.length !== 0 && (
                    lotDetail.company.annuaires.map((contact) => (
                      <tr key={contact.id}>
                        <td className="w-35">{contact.nom}</td>
                        <td className="w-35" onClick={handleClipboard}>{contact.email}</td>
                        <td className="w-35" onClick={handleClipboard}>{contact.telephone}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {lotDetail.company && lotDetail.company.annuaires.length === 0 && (
                <><p>Aucun contact dans cette entreprise</p>
                  {AuthAPI.isAdmin() && <Link className="btn btn-primary" to={'/admin/company/' + lotDetail.company.id}> En ajouter un </Link>}</>
              )}
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
                <Button
                  type="button"
                  onClick={handleShowAddLot}
                  className="btn btn-danger"
                  text="Annuler"
                />
                <Button
                  type="button"
                  text="Valider"
                  onClick={handleSubmitLot}
                  className="btn btn-success"
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!showLotDetail ? (
            <Button text="Fermer" type="button" className="btn btn-danger" onClick={handleShowLotModal}/>
          ) :
            <Button type="button"
              className="btn btn-primary"
              text="Retour"
              onClick={() => handleShowLotDetail()}
            />}
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
