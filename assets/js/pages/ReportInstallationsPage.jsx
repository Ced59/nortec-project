import React, {useContext, useEffect, useState} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";
import Button from "../components/forms/Button";
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";
import FieldTextArea from "../components/forms/FieldTextArea";


const ReportInstallationsPage = () => {


    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);
    const [commentaire, setCommentaire] = useState("");

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    useEffect(() => {
        setSelectedValue('installations');
    });


    //Gestion des changement d'input dans le form
    const handleChange = ({currentTarget}) => {
        setCommentaire(currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
    };


    return (
        <>
            <NavbarLeftWithRouter/>
            <div className='page-content'>
                <h2>Installations de chantiers :</h2>
                <FieldTextArea placeholder="Commentaire des installations du chantier"
                               onChange={handleChange}
                               label=""
                               name="installation"
                               value={commentaire}
                               rows="20"
                />
                <Button className="btn btn-info float-right" onClick={handleSubmit} type="submit" text="Envoyer"/>
            </div>
        </>
    );
};

export default ReportInstallationsPage;