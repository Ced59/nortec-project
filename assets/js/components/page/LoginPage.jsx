import React, {useState} from 'react';
import Field from "../forms/Field";


const LoginPage = ({history}) => {

    // Etat initial du component
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    // Gestion des champs
    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    };

    // Gestion du Submit
    const handleSubmit = event => {
        event.preventDefault();

          //TODO Gérer l'authentification et les erreurs. Rendre async la fonction

            history.push("/projects");
    };


    return (
        <>
            <h1 className="mb-5">Connexion à l'application</h1>

            <form className="card p-3 login-style" onSubmit={handleSubmit}>

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

                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Connexion
                    </button>
                </div>
            </form>

        </>
    );
};

export default LoginPage;