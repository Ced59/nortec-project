import React, {useContext, useEffect} from 'react';
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportInstallationsPage = () => {

    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    useEffect(() => {
        setSelectedValue('installations');
    });

    return (
        <>
            <NavbarLeftWithRouter/>

            <div className='page-content'>
                <p>Test route</p>
            </div>

        </>
    );
};

export default ReportInstallationsPage;