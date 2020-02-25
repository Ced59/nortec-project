import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AuthAPI from "../../services/AuthAPI";
import LogoCompanyComponent from "../images/LogoCompanyComponent";
import {toast} from "react-toastify";
import '../../../css/navbarTop.css';

const NavbarTop = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [search, setSearch] = useState(''); // TODO relier avec la page List Projects

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes déconnecté ");
        history.push("/");
    };

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value); //TODO relier avec la page List Projects
    };


    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light lighten-5 mb-4">

            <a className="navbar-brand" href="#"><LogoCompanyComponent style={{width: "100px"}}/></a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle navbar-top-style navbar-top-text-style" id="navbarDropdownMenuLink" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">Bienvenue Cedric  </a>
                        <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Votre profil</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>

                <form className="form-inline">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Rechercher un projet"
                        aria-label="Search"
                        onChange={handleSearch}
                        value={search}
                    />
                </form>
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