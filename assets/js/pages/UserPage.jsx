import React, {useEffect, useState} from 'react';
import Field from './../components/forms/Field'
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import userApi from '../services/UsersAPI';
import UserApi from '../services/UsersAPI';
import '../../css/fieldset.css';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

const UserPage = ({history, match, props}) => {

//------------------------------- Récupération de l'id si il y en a un --------------------------------
    const {id = "new"} = match.params;

    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        role: "ROLE_USER",
        active: true
    });

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    })

    const [edit, setEdit] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [userToModifyActive, setUserToModifyActive] = useState("");

//---------------------------------------- Récupérer un Utilisateur ------------------------------------

    const fetchUser = async id => {
        try {
            const {firstName, lastName, email, password, role, active} = await userApi.find(id);
            setUser({firstName, lastName, email, password, role, active});

        } catch (error) {
            toast.error("La modification de l'utilisateur a rencontré un problème !");
            history.replace("/admin/user/" + id);
        }

    }
//--------------------------- Chargement de l'utilisateur au changement d'identifiant ------------------
    useEffect(() => {
        if (id !== "new") {
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

            if (edit) {
                await userApi.update(id, user);
                toast.success("L'utilisateur a bien été modifié !");
                history.replace("/admin/userslist");
            } else {
                await userApi.create(user);
                toast.success("L'utilisateur a bien été créé !");
                history.replace("/admin/userslist");
            }

        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })

                setError(apiErrors);
            }
        }
    }

    //------------------------------------ Gestion du formulaire du statut actif -----------------------------------

    const handleSubmitActive = async event => {
        event.preventDefault();
    }


    // ----------------------------- Gestion de l'affichage de la fenêtre modale ------------------------------

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (userToDelete) => {
        setShowModal(true);
        setUserToModifyActive(userToDelete);
    }

    //------------------------------Modification du statut actif d'un Utilisateur ------------------------------------

    const handleActiveUser = async userToModify => {


        handleCloseModal();

        try {
            userToModify.active = !userToModify.active;
            await UserApi.modifyStatusUser(userToModify)
            toast.success("Le statut de l'utilisateur a bien été modifié !");
        } catch ({response}) {
            userToModify.active = !userToModify.active
            toast.error("Une erreur est survenue pendant la modification du statut de l'utilisateur !");
        }

    }

    return (
        <>
            <main className="container">
                {!edit && <h1>Création d'un Utilisateur</h1> || <h1>Modification de l'utilisateur</h1>}

                <div className="row">
                    <form onSubmit={handleSubmit} className="col-md-6 col-12 mt-3">
                        <fieldset className="border-fieldset">
                            <legend>Informations générales</legend>
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
                                label="Email"
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


                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Valider</button>
                                <Link to="/admin/userslist" className="btn btn-danger">Retour aux utilisateurs</Link>
                            </div>
                        </fieldset>
                    </form>

                    <div className="row col-md-6">
                        <form onSubmit={handleSubmitActive} className="col-12 mt-3">
                            <fieldset className="border-fieldset">
                                <legend>Rôle de l'utilisateur</legend>

                                <div className="row">
                                    {/*{UsersAPI.determineRole(user)}*/}
                                </div>

                            </fieldset>
                        </form>

                        <form onSubmit={handleSubmitActive} className="col-12 mt-1">
                            <fieldset className="border-fieldset">
                                <legend>Utilisateur actif</legend>
                                <div className="row">
                                    {edit ?
                                        <>
                                            {
                                                user.active ?
                                                    <p className="col-8">Le compte de l'utilisateur est bien activé</p>
                                                    :
                                                    <p className="col-8">Le compte de l'utilisateur n'est pas activé</p>
                                            }
                                            {
                                                user.active ?
                                                    <button onClick={() => handleShowModal(user)}
                                                            className="btn btn-danger col-3">Désactiver</button>
                                                    :
                                                    <button onClick={() => handleShowModal(user)}
                                                            className="btn btn-danger col-3">Activer</button>
                                            }
                                        </>
                                        :
                                        <p className="col-8">Le compte de l'utilisateur sera activé par défaut</p>

                                    }
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </main>

            <Modal {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Vous êtes sur le point de désactiver
                    l'utilisateur {userToModifyActive.firstName} {userToModifyActive.lastName}! <br/>
                    Tous les projets auquel il est affecté seront supprimé et vous devrez les réattribuer plus tard si vous réactivez le compte. <br/>
                    Êtes vous sûr de vouloir continuer?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Fermer
                    </Button>
                    <Button variant="danger" onClick={() => handleActiveUser(userToModifyActive)}>
                        Confirmer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserPage;
