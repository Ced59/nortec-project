import React, {useContext, useState} from 'react';
import Field from "../forms/Field";
import ImgComponent from "../images/ImgComponent";
import {Link} from "react-router-dom";
import LogoCompanyComponent from "../images/LogoCompanyComponent";
import {toast} from "react-toastify";
import AuthContext from "../../contexts/AuthContext";
import AuthAPI from "../../services/AuthAPI";



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
    };

    // Gestion du Submit
    const handleSubmit = async event => {
        event.preventDefault();

        //TODO Gérer l'authentification et les erreurs.

        try {

            await AuthAPI.authenticate(credentials); //TODO rajouter les credentials quand il y aura besoin
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes connnecté en tant que " + credentials.username  + "!");
            history.replace("/projects");

        } catch (error) {
            setError("Les informations de login/mot de passe sont incorrectes");
            toast.error("Une erreur est survenue");
        }
    };


    return (
        <>
            <div className="login-style mt-5 pt-5">
                <form className="login-style form card p-3 m-5" onSubmit={handleSubmit}>


                    <div className="card-title">
                        <LogoCompanyComponent style={{width: "150px"}} />

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
        </>
    );
};

export default LoginPage;