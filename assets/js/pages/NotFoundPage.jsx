import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import AuthContext from "../contexts/AuthContext";
import "../../css/loginPage.css";
import LogoCompanyComponent from "../components/images/LogoCompanyComponent";

const NotFoundPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <main className="container">
      <Helmet>
        <style>{"body { background-color: #005375; }"}</style>
      </Helmet>

      <div className="login-style mt-auto pt-auto">
        <div className="login-style card p-3 m-5">
          <div className="card-title">
            {!isAuthenticated && (
              <LogoCompanyComponent style={{ width: "150px" }} />
            )}

            <div className="text-center">
              <h1 className="login-style title mb-3">Page introuvable</h1>
              <NavLink to={!isAuthenticated ? "/" : "/projects"}>
                &larr; Retour à l'accueil
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
