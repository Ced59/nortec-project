import React, {useContext, useState} from 'react';
import Field from "../components/forms/Field";
import ImgWithStyleComponent from "../components/images/ImgWithStyleComponent";
import {Link} from "react-router-dom";
import LogoCompanyComponent from "../components/images/LogoCompanyComponent";
import {toast} from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/AuthAPI";
import '../../css/loginPage.css';
import {Helmet} from "react-helmet";


const LoginPage = ({history}) => {

    // Etat initial du component
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const {setIsAuthenticated} = useContext(AuthContext);

    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setCredentials({...credentials, [name]: value})

        console.log(credentials);
    };

    // Gestion du Submit
    const handleSubmit = event => {
        event.preventDefault();

        //TODO Gérer l'authentification et les erreurs.


        if (AuthAPI.authenticate(credentials)) {
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes connnecté en tant que " + credentials.username + "!");
            history.replace("/projects");

        } else {
            setError("Les informations de login/mot de passe sont incorrectes");
            toast.error("Une erreur est survenue");
        }
    };


    return (
        <main className="container">

            <Helmet>
                <style>{'body { background-color: #005375; }'}</style>
            </Helmet>

            <div className="login-style mt-5 pt-5">
                <form className="login-style form card p-3 m-5" onSubmit={handleSubmit}>


                    <div className="card-title">
                        <LogoCompanyComponent style={{width: "150px"}}/>

                        <h1 className="login-style title text-center mb-3">Bienvenue sur le portail Nortec</h1>
                    </div>


                    <div className="card-body">
                        <Field
                            label="Adresse Email"
                            value={credentials.username}
                            placeholder="Adresse mail de connexion"
                            type="email"
                            name="username"
                            error=""
                            onChange={handleChange}
                        />

                        <Field
                            label="Mot de passe"
                            value={credentials.password}
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />

                        <div className="mt-3">
                            <Link to="/reinitialisation">Réinitialisation du mot de passe</Link>
                        </div>

                        <div className="text-right mt-3 mb-3">
                            <button
                                type="submit"
                                className="btn btn-login"
                            >
                                Connexion
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;