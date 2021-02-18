import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import CompanyAPI from "../services/CompanyAPI";
import AnnuaireAPI from "../services/AnnuaireAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "../components/forms/Button";
import useIsMountedRef from "../components/UseIsMountedRef";

const AdminCompanyPage = ({ history, match, props }) => {
  const isMountedRef = useIsMountedRef();
  const { id = "new" } = match.params;

  const [company, setCompany] = useState({
    nom: "",
    adresse1: "",
    adresse2: "",
    codePostal: "",
    ville: "",
    mail1: "",
    mail2: "",
    annuaires: [],
  });

  const [error, setError] = useState({
    nom: "",
    adresse1: "",
    codePostal: "",
    ville: "",
  });
  const errorModel = useState(error);

  const [contact, setContact] = useState({
    company: "/api/companies/" + id,
    nom: "",
    email: "",
    telephone: "",
  });
  const [contactModel] = useState(contact);

  const [contactError, setContactError] = useState({
    nom: "",
    email: "",
  });
  const contactErrorModel = useState(contactError);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCompany({ ...company, [name]: value });
  };

  const fetchCompany = async (id) => {
    try {
      const data = await CompanyAPI.find(id);
      if (isMountedRef.current) {
        setCompany(data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Une erreur dans le chargement de l'entreprise")
    }
  };
  
  const fetchContact = async (id) => {
    try {
      const data = await AnnuaireAPI.find(id);
      if (isMountedRef.current) {
        setContact(data);
      }
    } catch (error) {
      toast.error("Une erreur lors du chargement des contacts")
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEdit(true);
      fetchCompany(id).then((r) => "");
    } else {
      setLoading(false);
    }
  }, [id]);

  //--------------------------------------------Gestion des contacts--------------------------------------------------------

  const handleChangeNewContact = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setContact({ ...contact, [name]: value });
  };

  const handleShowContactModal = (id) => {
    fetchContact(id);
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setContact([]);
    setShowContactModal(false);
  };

  const handleSubmitAddContact = async () => {
    try {
      await AnnuaireAPI.create(contact);
      toast.success("Le contact a bien été ajouté");
      fetchCompany(id);
      setContact(contactModel);
      setContactError(contactErrorModel);
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setContactError(apiErrors);
      }
    }
  };

  const handleSubmitUpdateContact = async () => {
    try {
      await AnnuaireAPI.update(contact.id, contact);
      toast.success("Le contact a bien été mis à jour");
      fetchCompany(id);
      setContact(contactModel);
      setContactError(contactErrorModel);
      setShowContactModal(false);
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setContactError(apiErrors);
      }
    }
  };

  const handleSubmitDeleteContact = async (id) => {
    try {
      await AnnuaireAPI.deleteContact(id);
      fetchCompany(company.id);
      setContact(contactModel);
      toast.success("Le contact a bien été supprimé");
      setShowContactModal(false);
    } catch ({ response }) {
      toast.error("Le contact n'a pas été supprimé")
    }
  };

  //-----------------------------------------------Envoie---------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      company.annuaires = company.annuaires.map(
        (annuaire) => "/api/annuaires/" + annuaire.id
      );
      if (edit) {
        await CompanyAPI.update(id, company);
        toast.success("L'entreprise a bien été modifié !");
        fetchCompany(id);
        setError(errorModel);
      } else {
        await CompanyAPI.create(company);
        toast.success("L'entreprise a bien été crée !");
        history.replace("/admin/company");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setError(apiErrors);
      }
    }
  };

  //--------------------------------------------Template--------------------------------------------------------

  return (
    <main className="container">
      <h1>{edit ? "Modifier l'entreprise" : "Ajouter une entreprise"}</h1>
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Field
            name="nom"
            label="Nom de l'entreprise"
            placeholder="Entrez le nom de l'entreprise"
            onChange={handleChange}
            value={company.nom}
            error={error.nom}
          />
          <Field
            name="adresse1"
            label="Adresse"
            placeholder="Entrez l'adresse de l'entreprise"
            onChange={handleChange}
            value={company.adresse1}
            error={error.adresse1}
          />
          <Field
            name="adresse2"
            label="Complément d'adresse"
            placeholder="Entrez l'adresse de l'entreprise"
            onChange={handleChange}
            value={company.adresse2}
          />
          <Field
            name="codePostal"
            label="Code Postal"
            placeholder="Entrez le Code Postal"
            onChange={handleChange}
            value={company.codePostal}
            error={error.codePostal}
          />
          <Field
            name="ville"
            label="Ville"
            placeholder="Entrez la ville"
            onChange={handleChange}
            value={company.ville}
            error={error.ville}
          />
          <h3>Contacts dans l'entreprise</h3>
          {edit && (
            <>
              {company.annuaires.length !== 0 ? (
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nom</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">N° téléphone</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {company.annuaires.map(contact => (
                      <tr key={contact.id}>
                        <td className="w-35">{contact.nom}</td>
                        <td className="w-35">{contact.email}</td>
                        <td className="w-35">{contact.telephone}</td>
                        <td className="text-center">
                          <Button
                              text="Modifier"
                            type="button"
                            onClick={() => handleShowContactModal(contact.id)}
                            className="btn btn-primary btn-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun contact dans cette entreprise</p>
              )}
              <table className="table">
                <thead>
                  <tr>
                    <th colSpan="4" className="border-0">
                      Ajouter un contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Field
                        name="nom"
                        placeholder="Nom du contact"
                        type="text"
                        onChange={handleChangeNewContact}
                        value={contact.nom}
                        error={contactError.nom}
                        noLabel={true}
                      />
                    </td>
                    <td>
                      <Field
                        name="email"
                        placeholder="Email du contact"
                        type="mail"
                        onChange={handleChangeNewContact}
                        value={contact.email}
                        error={contactError.email}
                        noLabel={true}
                      />
                    </td>
                    <td>
                      <Field
                        name="telephone"
                        placeholder="Téléphone du contact"
                        type="text"
                        onChange={handleChangeNewContact}
                        value={contact.telephone}
                        noLabel={true}
                      />
                    </td>
                    <td>
                      <Button
                        type="button"
                        text="Ajouter"
                        onClick={() => handleSubmitAddContact()}
                        className="btn btn-primary btn-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {!edit && (
            <p>
              Veuillez valider l'ajout de l'entreprise pour ajouter des contacts
            </p>
          )}
          <div className="form-group d-flex justify-content-between align-items-center mt-2">
            <Link to="/admin/company" className="btn btn-danger">
              Retour à la liste
            </Link>
            <Button text="Valider" className="btn btn-success"/>
          </div>
        </form>
      )}
      {loading && <div id="loading-icon" className="mt-5 mb-5" />}

      {/* ------------------------------------------------------MODAL MODIF CONTACT----------------------------------------------------- */}

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showContactModal}
        onHide={handleCloseContactModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modification du contact</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <Field
              name="nom"
              label="Nom"
              placeholder="Nom du contact"
              type="text"
              onChange={handleChangeNewContact}
              value={contact.nom}
              error={contactError.nom}
            />
            <Field
              name="email"
              label="Email"
              placeholder="Email du contact"
              type="mail"
              onChange={handleChangeNewContact}
              value={contact.email}
              error={contactError.email}
            />
            <Field
              name="telephone"
              label="N° téléphone"
              placeholder="Téléphone du contact"
              type="text"
              onChange={handleChangeNewContact}
              value={contact.telephone}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
                text="Supprimer"
              type="button"
              onClick={() => handleSubmitDeleteContact(contact.id)}
              className="btn btn-danger btn-sm"
            />
            <Button
              type="button"
              text="Confirmer"
              onClick={() => handleSubmitUpdateContact()}
              className="btn btn-primary btn-sm"
            />
          </Modal.Footer>
        </form>
      </Modal>
    </main>
  );
};

export default AdminCompanyPage;
