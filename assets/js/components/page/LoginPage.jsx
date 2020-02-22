import React, {useState} from 'react';
import Field from "../forms/Field";

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    };


    return (
        <>
            <h1 className="mb-5">Connexion à l'application</h1>

            <form className="card p-3 login-style">

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