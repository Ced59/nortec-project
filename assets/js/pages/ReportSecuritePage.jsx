import React, {useContext, useEffect} from 'react';
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportSecuritePage = () => {


    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    useEffect(() => {
        setSelectedValue('securite');
    });

    return (
        <>
            <NavbarLeftWithRouter/>

            <h1>Sécurité :</h1>

        </>
    );
};

export default ReportSecuritePage;