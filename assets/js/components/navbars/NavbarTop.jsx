import React, {useContext, useState} from 'react';
import AuthContext from "../../contexts/AuthContext";
import AuthAPI from "../../services/AuthAPI";
import LogoCompanyComponent from "../images/LogoCompanyComponent";
import {toast} from "react-toastify";
import '../../../css/navbarTop.css';
import {NavLink} from "react-router-dom";

const NavbarTop = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [completeNameUser] = useState(AuthAPI.getUserFirstNameLastName());
    const [userId] = useState(AuthAPI.getUserId());


    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes déconnecté ");
        history.push("/");
    };



    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light lighten-5 mb-4 fixed-top">

            <NavLink className="navbar-brand" to="/projects"><LogoCompanyComponent style={{width: "100px"}}/></NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle navbar-top-style navbar-top-text-style"
                           id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">Bienvenue {completeNameUser} <br/>
                            <span className="text-statut">Connecté comme {AuthAPI.isRole()}</span>
                        </a>
                        <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                            <NavLink className="dropdown-item" to={"/profil/" + userId}>Votre profil</NavLink>
                            {AuthAPI.isAdmin() &&
                            <NavLink className="dropdown-item" to={"/admin"}>Panneau Administration</NavLink>
                            }
                        </div>
                    </li>
                </ul>

                <div className="nav-item">
                    <button onClick={handleLogout} className="btn btn-danger ml-3">
                        Déconnexion
                    </button>
                </div>
            </div>

        </nav>

    );
};


export default NavbarTop;
