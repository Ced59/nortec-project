import React, {useEffect, useState} from 'react';
import Field from './../components/forms/Field'
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import UsersAPI from '../services/UsersAPI';
import '../../css/fieldset.css';
import '../../css/loading-icon.css';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import ProjectsAPI from "../services/ProjectsAPI";
import DateAPI from "../services/DateAPI";

const UserPage = ({history, match, props}) => {

    const STATUS_CLASSES = {
        no_start: "info",
        in_progress: "warning",
        finished: "success",
        archived: "primary"
    };

    const STATUS_LABEL = {
        no_start: "Pas démarré",
        in_progress: "En cours",
        finished: "Fini",
        archived: "Archivé"
    };

//------------------------------- Récupération de l'id si il y en a un --------------------------------
    const {id = "new"} = match.params;

    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        roles: [],
        active: true,
        projects: []
    });

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    })

    const [projects, setProjects] = useState("");
    const [projectsByUser, setProjectsByUser] = useState([]);

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showModalRole, setShowModalRole] = useState(false);
    const [userToModifyActive, setUserToModifyActive] = useState("");
    const [userToModifyRole, setUserToModifyRole] = useState("");

    const [roleChange, setRoleChange] = useState({
        roles: ['ROLE_USER']
    });

//---------------------------------------- Récupérer un Utilisateur ------------------------------------

    const fetchUser = async id => {
        try {
            const result = await UsersAPI.find(id);
            setUser(result);
            setLoading(false);
            console.log(user);

        } catch (error) {
            toast.error("Le chargement de l'utilisateur a rencontré un problème !");
            setLoading(false);
            history.replace("/admin/user/" + id);
        }

    }

    //---------------------------------------- Récupérer les projets de l'utilisateur ------------------------------------

    const fetchProjects = async () => {
        try {
            let result = await ProjectsAPI.findAll();
            console.log(result);
            setProjects(result);
            setLoadingProjects(false);

        } catch (error) {
            toast.error("Le chargement des projets a rencontré un problème !");
            setLoadingProjects(false);
            history.replace("/admin/user/" + id);
        }

    }

    const filteredUserProjects = () => {
        const filteredUserProject = [];
        if (!loadingProjects) {
            projects.map(project => {
                project.users.map(user => {
                    if (user.id === parseInt(id, 10)) {
                        filteredUserProject.push(project);
                    }
                })
            });

            return filteredUserProject;
        }
    }

//--------------------------- Chargement de l'utilisateur au changement d'identifiant ------------------
    useEffect(() => {
        if (id !== "new") {
            setEdit(true);
            fetchUser(id).then(r => "");

        } else {
            setLoading(false);
        }

    }, [id]);


    useEffect(() => {
        if (id !== "new") {
            setEdit(true);
            fetchProjects().then(r => {
                setProjectsByUser(filteredUserProjects());
            });

        } else {
            setLoadingProjects(false);
        }

    }, []);

//----------------------------------- gestion de changement des input-----------------------------------
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    };

    const handleChangeRoleSelect = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setRoleChange({...roleChange, [name]: value});
    }

//------------------------------------ Gestion de soumission du form -----------------------------------

    const handleSubmit = async event => {
        event.preventDefault();

        try {

            if (edit) {
                await UsersAPI.update(id, user);
                toast.success("L'utilisateur a bien été modifié !");
                history.replace("/admin/userslist");
            } else {
                await UsersAPI.create(user);
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


    // ----------------------------- Gestion de l'affichage des fenêtres modales ------------------------------

    const handleCloseModal = () => setShowModal(false);
    const handleCloseModalRole = () => setShowModalRole(false);
    const handleShowModal = userToModifyActive => {
        setShowModal(true);
        setUserToModifyActive(userToModifyActive);
    }

    const handleShowModalRole = userToModifyRole => {
        setShowModalRole(true);
        setUserToModifyRole(userToModifyRole);
    }
    //------------------------------Modification du statut actif d'un Utilisateur ------------------------------------

    const handleActiveUser = async userToModify => {


        handleCloseModal();

        try {
            userToModify.active = !userToModify.active;

            await UsersAPI.update(id, userToModify);
            toast.success("Le statut de l'utilisateur a bien été modifié !");
        } catch ({response}) {
            userToModify.active = !userToModify.active
            toast.error("Une erreur est survenue pendant la modification du statut de l'utilisateur !");
        }

    }

    //--------------------------------Modification du rôle d'un utilisateur ------------------------------------------

    const handleChangeRole = async (event) => {

        event.preventDefault();
        handleCloseModalRole();

        const roleCopie = userToModifyRole.roles;
        const userModify = userToModifyRole;


        try {
            console.log(userToModifyRole);
            console.log(roleChange.role);


            userModify.roles.splice(0, 1, roleChange.role)
            setUserToModifyRole(userModify);
            console.log(userToModifyRole);

            await UsersAPI.update(userToModifyRole.id, newRole);
            toast.success("Le rôle de l'utilisateur a bien été modifié !");
        } catch ({response}) {
            userModify.roles.splice(0, 1, roleCopie);
            setUserToModifyRole(userModify);
            toast.error("Une erreur est survenue pendant la modification du rôle de l'utilisateur !");
        }

    }

    //---------------------------------Retirer un projet de l'utilisateur --------------------------------------------

    const handleRetireProject = async (projectToRetire) => {
        let projects = filteredUserProjects();

        console.log(projects);
        const filteredProject = projects.filter(project => project !== projectToRetire);
        console.log(filteredProject);
        user.projects = filteredProject;
        const originalUser = {...user};
        setUser(user);
        try {
            await UsersAPI.update(user.id, user);
            toast.success("Le projet a bien été enlevé de l'utilisateur.");
        }
        catch
        {
            setUser(originalUser);
            toast.error("Il y a eu un problème.");
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
                            {!loading ?
                                <>
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
                                        placeholder="Email du nouvel utilisateur"
                                        type="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        error={error.email}
                                    />
                                    <Field
                                        name="password"
                                        label="Mot de passe"
                                        placeholder={!edit ? "Mot de passe du nouvel utilisateur" : "Changer le mot de passe de l'utilisateur"}
                                        type="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        error={error.password}
                                    />

                                    <div className="form-group text-right mt-4">
                                        <button type="submit" className="btn btn-primary">Valider</button>
                                    </div>
                                </>
                                :
                                <div id="loading-icon"/>
                            }

                        </fieldset>
                    </form>

                    <div className="row col-md-6">
                        <form className="col-12 mt-3">
                            <fieldset className="border-fieldset">
                                <legend>Rôle de l'utilisateur</legend>


                                <div className="row">
                                    {edit ?
                                        <>
                                            {!loading ?
                                                <>
                                                    <p className="col-8">{UsersAPI.determineRole(user)}</p>
                                                    <button onClick={() => handleShowModalRole(user)}
                                                            className="btn btn-danger col-3">Changer
                                                    </button>
                                                </>
                                                :
                                                <div id="loading-icon"/>
                                            }
                                        </>

                                        :
                                        <p className="col-12">Le compte aura les droits d'utilisateur par défaut</p>
                                    }
                                </div>


                            </fieldset>
                        </form>

                        <div className="col-12 mt-1">
                            <fieldset className="border-fieldset">
                                <legend>Utilisateur actif</legend>
                                <div className="row">
                                    {edit ?
                                        <>
                                            {!loading ?
                                                <>
                                                    {
                                                        user.active ?
                                                            <p className="col-8">Le compte de l'utilisateur est bien
                                                                activé</p>
                                                            :
                                                            <p className="col-8">Le compte de l'utilisateur n'est pas
                                                                activé</p>
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
                                                <div id="loading-icon"/>
                                            }
                                        </>
                                        :
                                        <p className="col-12">Le compte de l'utilisateur sera activé par défaut</p>

                                    }
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="form-group text-right mt-4 mr-5">
                    <Link to="/admin/userslist" className="btn btn-primary">Retour à la liste des utilisateurs</Link>
                </div>
                <>
                    {edit &&
                    <>

                        <div className="col-12">
                            <fieldset className="border-fieldset mt-3">
                                <legend>Liste des projets affectés à {user.firstName} {user.lastName}</legend>
                                {!loadingProjects ?
                                    <>

                                        <table className="table table-hover table-striped">
                                            <thead>
                                            <tr>
                                                <th className="p-2">Nom</th>
                                                <th className="p-2">Ville</th>
                                                <th className="p-2 text-center">Date début</th>
                                                <th className="p-2 text-center">Statut</th>
                                                <th/>

                                            </tr>
                                            </thead>

                                            <tbody>
                                            {filteredUserProjects().map(project =>
                                                <tr key={project.id}>
                                                    <td className="p-2">{project.name}</td>
                                                    <td className="p-2">{project.ville}</td>
                                                    <td className="p-2 text-center">{DateAPI.formatDate(project.dateDebut)}</td>
                                                    <td className="p-2 text-center"><span
                                                        className={"pl-2 pr-2 pt-1 pb-1 badge badge-" +
                                                        STATUS_CLASSES[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}>
                                                        {STATUS_LABEL[DateAPI.determineStatus(project.dateDebut, DateAPI.verifyDateExist(project.dateFinReelle))]}</span>
                                                    </td>
                                                    <td className="p-2 text-center">
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleRetireProject(project)}
                                                        >
                                                            Retirer le projet
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </>

                                    :
                                    <div id="loading-icon"/>
                                }
                            </fieldset>
                        </div>


                        <div className="form-group text-right mt-4 mr-5">
                            <Link to="/admin/userslist" className="btn btn-primary">Retour à la liste des
                                utilisateurs</Link>
                        </div>

                    </>
                    }
                </>
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
                    Vous êtes sur le point {userToModifyActive.active ? <>de désactiver </> : <>d'activer </>}
                    l'utilisateur {userToModifyActive.firstName} {userToModifyActive.lastName}! <br/>
                    {userToModifyActive.active ? <>Tous les projets auquel il est affecté seront supprimé et vous devrez
                        les réattribuer plus tard si
                        vous réactivez le compte. <br/> </> : <>Il vous faudra réassigner manuellement les projets
                        auxquels l'utilisateur pourra avoir accès. <br/></>}

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

            <Modal {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   show={showModalRole} onHide={handleCloseModalRole}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention!!!</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleChangeRole}>
                    <Modal.Body>
                        Vous êtes sur le point de changer le rôle de
                        l'utilisateur {userToModifyRole.firstName} {userToModifyRole.lastName}! <br/>
                        Êtes vous sûr de vouloir continuer? <br/><br/>
                        Nouveau rôle :


                        <select name="role" id="role" onChange={handleChangeRoleSelect}>
                            <option value="ROLE_USER">Utilisateur</option>
                            <option value="ROLE_ADMIN">Administrateur</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModalRole}>
                            Fermer
                        </Button>
                        <Button variant="danger" type="submit">
                            Confirmer
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default UserPage;
