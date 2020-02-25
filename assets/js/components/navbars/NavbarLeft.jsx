import React from 'react';
import '../../../css/navbarLeft.css';

const NavbarLeft = (props) => {
    return (
        <div className="vertical-nav bg-white" id="sidebar">
            <div className="py-4 px-3 mb-4 bg-light">
                <div className="media d-flex align-items-center">
                    <div className="media-body">
                        <h4 className="m-0">Jason Doe</h4>
                        <p className="font-weight-light text-muted mb-0">Web developer</p>
                    </div>
                </div>
            </div>

            <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

            <ul className="nav flex-column bg-white mb-0">
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic bg-light">

                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        About
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        Services
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        Gallery
                    </a>
                </li>
            </ul>

            <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

            <ul className="nav flex-column bg-white mb-0">
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        Area charts
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        Bar charts
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        Pie charts
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-dark font-italic">

                        Line charts
                    </a>
                </li>
            </ul>
        </div>
);
};

export default NavbarLeft;