import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import LogoCompanyComponent from "../components/images/LogoCompanyComponent";
import { toast } from "react-toastify";
import "../../css/loginPage.css";
import { Helmet } from "react-helmet";
import MailAPI from "../services/MailAPI";

const NewPasswordPage = ({ match }) => {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [passwords, setPasswords] = useState({
    id: match.params.id,
    newPassword: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPasswords({ ...passwords, [name]: value });
  };
  useEffect(() => {
    setEnableSubmit(passwords.newPassword === passwords.passwordConfirm && passwords.newPassword.length !== 0);
  }, [passwords]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await MailAPI.newPassword(passwords).then((r) => {
        // toast.success(`Le mot de passe a bien été modifié`);
        toast.info(r.data);
      });
    } catch (e) {
      toast.error(`Une erreur s'est produite, merci de reessayer plus tard`);
    }
  };

  // ----------------------------------------------TEMPLATE--------------------------------------------------

  return (
    <main className="container">
      <Helmet>
        <style>{"body { background-color: #005375; }"}</style>
      </Helmet>

      <div className="login-style mt-auto pt-auto">
        <form className="login-style form card p-3 m-5" onSubmit={handleSubmit}>
          <div className="card-title">
            <LogoCompanyComponent style={{ width: "150px" }} />
          </div>

          <div className="card-body">
            <Field
              label="Nouveau mot de passe"
              value={passwords.newPassword}
              placeholder="Entrez votre nouveau mot de passe"
              type="password"
              name="newPassword"
              onChange={handleChange}
            />

            <Field
              label="Confirmer votre mot de passe"
              value={passwords.passwordConfirm}
              placeholder="Entrez de nouveau votre mot de passe"
              type="password"
              name="passwordConfirm"
              onChange={handleChange}
            />

            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-danger">
                Retour à la connexion
              </Link>
              <button
                type="submit"
                className="btn btn-login"
                disabled={!enableSubmit}
              >
                Envoyer
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewPasswordPage;
