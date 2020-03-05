import React, {useContext, useEffect, useState} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import fakeData from "../components/fakeDataForDev/fakeData";
import {toast} from "react-toastify";


const ReportInstallationsPage = ({match}) => {


    const [commentaire, setCommentaire] = useState("");

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const urlParams = match.params;

    const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

    //Gestion des changement d'input dans le form
    const handleChange = ({currentTarget}) => {
        setCommentaire(currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        toast.success("Le commentaire a bien été enregistré !");

    };

    const fetchReport = () => {

        //Vérification si édition ou nouveau rapport... Dans la version finale, le nouveau rapport existera mais avec valeurs vides donc pas de vérification à ce niveau
        if (reportById) {
            setCommentaire(reportById.installations);
        }

    };

    useEffect(() => {
        //TODO Normalement charge le projet à chaque fois que l'id change. Attention plus tard vérifier que tout fonctionne avec axios
        fetchReport();
        //console.log(project);
    }, []);


    return (
        <>
            <NavbarLeftWithRouter selected='installations'/>
            <div className='page-content'>
                <h2>Installations de chantiers :</h2>
                <FieldTextArea placeholder=""
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