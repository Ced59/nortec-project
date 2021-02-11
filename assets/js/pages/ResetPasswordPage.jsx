import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import LogoCompanyComponent from "../components/images/LogoCompanyComponent";
import { toast } from "react-toastify";
import "../../css/loginPage.css";
import { Helmet } from "react-helmet";
import MailAPI from "../services/MailAPI";

const ResetPasswordPage = () => {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    setEnableSubmit(email.length !== 0);
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEnableSubmit(false);
    try {
      await MailAPI.resetPassword(email).then((r) => {
        toast.info(
          `Si l'adresse ${email} appartient à un compte, un email lui a été envoyé`
        );
        setEmail("");
      });
    } catch (e) {
      console.log(e);
      toast.error(`Une erreur s'est produite, merci de reessayer plus tard`);
      setEnableSubmit(true);
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
              label="Adresse email de récupération"
              value={email}
              placeholder="Entrez votre adresse email"
              type="email"
              onChange={e=>setEmail(e.target.value)}
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

export default ResetPasswordPage;
