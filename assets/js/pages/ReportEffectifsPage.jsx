import React, {useContext, useEffect} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";

const ReportEffectifsPage = (props) => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);

    useEffect(() => {
        setSelectedValue('effectifs');
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

export default ReportEffectifsPage;