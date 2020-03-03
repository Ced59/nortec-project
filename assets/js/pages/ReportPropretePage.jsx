import React, {useContext, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportPropretePage = () => {


    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
            <>
                <NavbarLeftWithRouter selected='proprete'/>

                <div className='page-content'>
                    <p>Propreté des accès</p>
                </div>


            </>
    );
};

export default ReportPropretePage;