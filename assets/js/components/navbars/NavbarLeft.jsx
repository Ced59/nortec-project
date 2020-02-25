import React from 'react';
import '../../../css/navbarLeft.css';

const NavbarLeft = (props) => {
    return (
        <div className="vertical-nav" id="sidebar">


            <p className="text-white font-weight-bold text-uppercase px-3 small pb-4 mt-5">Liste des projets</p>

            <ul className="nav flex-column mb-0">
                <li className="nav-item">
                    <a href="#" className="nav-link font-italic selected">

                        Super Projet 1
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link font-italic">

                        Super Projet 2
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link font-italic">

                        Super Projet 3
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link font-italic">

                        Super Projet 4
                    </a>
                </li>
            </ul>


        </div>
);
};

export default NavbarLeft;