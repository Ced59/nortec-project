import React, {useContext, useEffect} from 'react';
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportEcheancesPage = () => {

    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    useEffect(() => {
        setSelectedValue('echeances');
    });

    return (
        <>
            <NavbarLeftWithRouter/>
            <div className="page-content">
                <h1>Echéances :</h1>
            </div>
        </>
    );
};

export default ReportEcheancesPage;