import React from 'react';
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";

const ReportValidatePage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);


    return (
        <main className="container">
            <NavbarLeftWithRouter selected='validate'/>

            <div className='page-content'>

                test route
            </div>
        </main>
    );
};

export default ReportValidatePage;