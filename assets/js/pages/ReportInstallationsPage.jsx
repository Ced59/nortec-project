import React, {useContext, useEffect} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";
import Button from "../components/forms/Button";
import Field from "../components/forms/Field";
import SelectedNavBarLeftContext from "../contexts/SelectedNavBarLeftContext";


const ReportInstallationsPage = () => {


    const {setSelectedValue} = useContext(SelectedNavBarLeftContext);

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    useEffect(() => {
        setSelectedValue('installations');
    });

    const [commentaire, setCommentaire] = useState("");

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

            <Field placeholder="Commentaire des installations du chantier" onChange={handleChange}
                   label="Installations de chantier" name="installation" value={commentaire}/>
            <Button className="btn btn-info float-right" onClick={handleSubmit} type="submit" text="Envoyer"/>
        </>
    );
};

export default ReportInstallationsPage;