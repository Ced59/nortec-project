import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import CompanyAPI from "../services/CompanyAPI";
import AnnuaireAPI from "../services/AnnuaireAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCompanyPage = ({ history, match }) => {
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
    adresse2: "",
    codePostal: "",
    ville: "",
    mail1: "",
    mail2: "",
  });

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (id !== "new") {
      setEdit(true);
      fetchCompany(id).then((r) => "");
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(company);

    try {
      if (edit) {
        await CompanyAPI.update(id, company);
        toast.success("L'entreprise a bien été modifié !");
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
            error={error.adresse2}
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
          <Field
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
          />
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th colSpan="3" className="text-center border-0">
                  Contacts dans l'entreprise
                </th>
              </tr>
              <tr>
                <th className="border-0">Nom</th>
                <th className="border-0">Email</th>
                <th className="border-0">N° téléphone</th>
              </tr>
            </thead>
            <tbody>
              {company.annuaires.map((contact) => (
                <tr key={contact.id}>
                  <td className="w-35">{contact.nom}</td>
                  <td className="w-35">{contact.email}</td>
                  <td className="w-35">{contact.telephone}</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm">Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </main>
  );
};

export default AdminCompanyPage;
