import React from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportEcheancesPage = () => {
    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
        <>
            <NavbarLeftWithRouter/>

            <h1>Echéances :</h1>


        </>
    );
};

export default ReportEcheancesPage;