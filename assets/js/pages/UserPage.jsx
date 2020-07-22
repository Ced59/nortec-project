import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserApi from '../services/UsersAPI';

const UserPage = ({history, match}) => {

//------------------------------- Récupération de l'id si il y en a un --------------------------------
    const {id = "new"} = match.params;

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

    const [edit, setEdit] = useState(false);
    
//---------------------------------------- Récupérer un Utilisateur ------------------------------------

    const fetchUser = async id =>{
        try{
            const {firstName,lastName,email,password} = await userApi.find(id);
            setUser({firstName,lastName,email,password});
        }catch(error){
            toast.error("L'utilisateur a bien été modifié !");
            history.replace("/admin/userslist");
        }

    } 
//--------------------------- Chargement de l'utilisateur au changement d'identifiant ------------------
    useEffect(() => {
        if(id !== "new") {
            setEdit(true);
            fetchUser(id).then(r => "");
        }

    }, [id]);

//----------------------------------- gestion de changement des input-----------------------------------
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    };

//------------------------------------ Gestion de soumission du form -----------------------------------

    const handleSubmit = async event => {
        event.preventDefault();

        try {

            if(edit){
                await UserApi.update(id, user);
                toast.success("L'utilisateur a bien été modifié !");
            } else {
                await UserApi.create(user);
                toast.success("L'utilisateur a bien été créé !");
                history.replace("/admin/userslist");
            }
           setError({});
        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.map(({propertyPath, message}) =>{
                    apiErrors[propertyPath] = message;
                })

                setError(apiErrors);
            }
        }
    }

    return ( <main className="container">
        {!edit && <h1>Création d'un Utilisateur</h1> || <h1>Modification de l'utilisateur</h1>}

        <form onSubmit={handleSubmit} >
            <Field 
                name="lastName" 
                label="Nom de famille" 
                placeholder="Nom de famille du nouvel utilisateur" 
                value={user.lastName} 
                onChange={handleChange} 
                error={error.lastName} 
            />
            <Field 
                name="firstName" 
                label="Prénom" 
                placeholder="Prénom du nouvel utilisateur" 
                value={user.firstName} 
                onChange={handleChange} 
                error={error.firstName}
            />
            <Field 
                name="email" 
                label="email" 
                placeholder="email du nouvel utilisateur" 
                type="email" 
                value={user.email} 
                onChange={handleChange} 
                error={error.email}
            />
            <Field 
                name="password" 
                label="Mot de passe" 
                placeholder="mot de passe du nouvel utilisateur" 
                type="password" 
                value={user.password} 
                onChange={handleChange} 
                error={error.password}
            />

            <div className="form-group d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-success">Valider</button>
                <Link to="/admin/userslist" className="btn btn-danger">Retour aux utilisateurs</Link>
            </div>
        </form>
    </main> );
}
 
export default UserPage;
