import React, {useState} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";
import Button from "../components/forms/Button";
import Field from "../components/forms/Field";

const ReportInstallationsPage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const [commentaire, setCommentaire] = useState("");

    //Gestion des changement d'input dans le form
    const handleChange = ({currentTarget}) => {
        setCommentaire(currentTarget.value);
    };

    return (
        <>
            <NavbarLeftWithRouter/>

            <Field placeholder="Commentaire des installations du chantier" onChange={handleChange}
                   label="Installations de chantier" name="installation" value={commentaire}/>
            <Button className="btn btn-info float-right" type="submit" text="Envoyer"/>
        </>
    );
};

export default ReportInstallationsPage;