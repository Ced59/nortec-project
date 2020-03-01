import React from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";

const ReportEffectifsPage = (props) => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
        <>
            <NavbarLeftWithRouter/>

            <div className='page-content'>
                <p>Test route</p>
            </div>

        </>
    );
};

export default ReportEffectifsPage;