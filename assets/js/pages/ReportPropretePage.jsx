import React, {useContext, useEffect} from 'react';
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportPropretePage = () => {

    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    useEffect(() => {
        setSelectedValue('proprete');
    });

    return (
            <>
                <NavbarLeftWithRouter/>

                <div className='page-content'>
                    <p>Propreté des accès</p>
                </div>


            </>
    );
};

export default ReportPropretePage;