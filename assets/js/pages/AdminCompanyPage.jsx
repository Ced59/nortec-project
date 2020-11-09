import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import CompanyAPI from "../services/CompanyAPI";
import AnnuaireAPI from "../services/AnnuaireAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

const AdminCompanyPage = ({ history, match, props }) => {
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
      setCompany(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchContact = async (id) => {
    try {
      const data = await AnnuaireAPI.find(id);
      setContact(data);
    } catch (error) {
      console.log(error.response);
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
      console.log(contact);
      await AnnuaireAPI.create(contact);
      console.log(contact);
      toast.success("Le contact a bien été ajouté");
      fetchCompany(id);
      setContact(contactModel);
      setContactError(contactErrorModel);
      console.log(contact);
    } catch ({ response }) {
      console.log(response);
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
      console.log(contact);
      await AnnuaireAPI.update(contact.id, contact);
      console.log(contact);
      toast.success("Le contact a bien été mis à jour");
      fetchCompany(id);
      setContact(contactModel);
      setContactError(contactErrorModel);
      setShowContactModal(false);
    } catch ({ response }) {
      console.log(response);
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
      console.log(contact);
      fetchCompany(company.id);
      setContact(contactModel);
      toast.success("Le contact a bien été supprimé");
      setShowContactModal(false);
    } catch ({ response }) {
      console.log(response);
    }
  };

  //-----------------------------------------------Envoie---------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(company);

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
        console.log(company);
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
      console.log(response);
    }
  };

  //--------------------------------------------Template--------------------------------------------------------

  return (
    <main className="container">
      {(!edit && <h1>Ajouter une entreprise</h1>) || (
        <h1>Modifier l'entreprise</h1>
      )}
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
          {/* <Field
            name="mail1"
            label="Mail (obligatoire)"
            placeholder="Entrez le Mail de l'entreprise"
            type="email"
            onChange={handleChange}
            value={company.mail1}
            error={error.mail1}
          />
          <Field
            name="mail2"
            label="Mail (optionnel)"
            placeholder="Entrez une adresse mail "
            type="email"
            onChange={handleChange}
            value={company.mail2}
            error={error.mail2}
          /> */}
          <h3>Contacts dans l'entreprise</h3>
          {edit && (
            <>
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
                  {company.annuaires.length !== 0 ? (
                    company.annuaires.map((contact) => (
                      <tr key={contact.id}>
                        <td className="w-35">{contact.nom}</td>
                        <td className="w-35">{contact.email}</td>
                        <td className="w-35">{contact.telephone}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => handleShowContactModal(contact.id)}
                            className="btn btn-primary btn-sm"
                          >
                            Modifier
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Aucun contact dans cette entreprise</p>
                  )}
                </tbody>
              </table>
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
                      <button
                        type="button"
                        onClick={() => handleSubmitAddContact()}
                        className="btn btn-primary btn-sm"
                      >
                        Ajouter
                      </button>
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
            <button type="submit" className="btn btn-success">
              Valider
            </button>
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
            <button
              type="button"
              onClick={() => handleSubmitDeleteContact(contact.id)}
              className="btn btn-danger btn-sm"
            >
              Supprimer
            </button>
            <button
              type="button"
              onClick={() => handleSubmitUpdateContact()}
              className="btn btn-primary btn-sm"
            >
              Confirmer
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </main>
  );
};

export default AdminCompanyPage;
