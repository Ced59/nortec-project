import React, { useState } from 'react';
import Field from './../components/forms/Field'
import { Link } from 'react-router-dom';
import Axios from 'axios';

const UserPage = (props) => {

    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
           const response = await Axios.post("http://localhost:8000/api/users", user);

           setError({});
           console.log(response.data);
        } catch (error) {
            if(error.response.data.violations){
                const apiErrors = {};
                error.response.data.violations.map(violation =>{
                    apiErrors[violation.propertyPath] = violation.message;
                })

                setError(apiErrors);
            }
        }
    }

    return ( <main className="container">
        <h1>Création d'un Utilisateur</h1>

        <form onSubmit={handleSubmit} >
            <Field name="lastName" label="Nom de famille" placeholder="Nom de famille du nouvel utilisateur" value={user.lastName} onChange={handleChange} error={error.lastName} />
            <Field name="firstName" label="Prénom" placeholder="Prénom du nouvel utilisateur" value={user.firstName} onChange={handleChange} error={error.firstName}/>
            <Field name="email" label="email" placeholder="email du nouvel utilisateur" type="email" value={user.email} onChange={handleChange} error={error.email}/>
            <Field name="password" label="Mot de passe" placeholder="mot de passe du nouvel utilisateur" type="password" value={user.password} onChange={handleChange} error={error.password}/>

            <div className="form-group">
                <button type="submit" className="btn btn-success">Valider</button>
                <Link to="/admin/userslist" className="btn btn-danger">Retour aux utilisateurs</Link>
            </div>
        </form>
    </main> );
}
 
export default UserPage;