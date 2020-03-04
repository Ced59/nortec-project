import React, {useContext, useEffect} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";

const ReportEffectifsPage = (props) => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);




    return (
        <>
            <NavbarLeftWithRouter selected='effectifs'/>

            <div className='page-content'>
                <p>Effectifs</p>
            </div>

        </>
    );
};

export default ReportEffectifsPage;