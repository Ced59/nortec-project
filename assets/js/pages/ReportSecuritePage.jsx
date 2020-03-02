import React from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportSecuritePage = () => {
    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
        <>
            <NavbarLeftWithRouter/>

            <h1>Sécurité :</h1>


        </>
    );
};

export default ReportSecuritePage;