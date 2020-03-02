import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportPropretePage = () => {
    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
            <>
                <NavbarLeftWithRouter/>

                <h1>Propretés des accès :</h1>


            </>
    );
};

export default ReportPropretePage;