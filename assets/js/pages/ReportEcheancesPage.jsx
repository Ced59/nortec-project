import React, {useContext, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportEcheancesPage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);


    return (
        <>
            <NavbarLeftWithRouter selected='echeances'/>
            <div className="page-content">
                <h1>Echéances :</h1>
            </div>
        </>
    );
};

export default ReportEcheancesPage;