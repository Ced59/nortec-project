import React, {useContext, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportSecuritePage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
        <>
            <NavbarLeftWithRouter selected='securite'/>

            <div className='page-content'>
                <p>Sécurité</p>
            </div>
        </>
    );
};

export default ReportSecuritePage;