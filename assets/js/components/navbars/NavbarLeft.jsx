import React from 'react';
import '../../../css/navbarLeft.css';
import {Link} from "react-router-dom";

// TODO faire un map sur le tableau de données quand il y aura un back
// TODO changer la class selected en fonction du clic

const NavbarLeft = (props) => {
    return (
        <div className="vertical-nav" id="sidebar">

            <p className="text-white font-weight-bold text-uppercase px-3 small pb-4 mt-5">Liste des projets</p>

            <ul className="nav flex-column mb-0">

                <li className="nav-item">
                    <Link to={"/project/"} className="nav-link font-italic selected">
                        Super Projet 1
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/projects" className="nav-link font-italic">
                        Super Projet 2
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/projects" className="nav-link font-italic">
                        Super Projet 3
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/projects" className="nav-link font-italic">
                        Super Projet 4
                    </Link>
                </li>
            </ul>

        </div>
);
};

export default NavbarLeft;