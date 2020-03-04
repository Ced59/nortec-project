import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import Field from "../components/forms/Field";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";

const ReportPropretePage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const [conforme, setConforme] = useState(null) ;

    const handleCheckConforme = () => {
        if(!conforme || conforme === false) {
            setConforme(true);
        }
    };

    const handleCheckNonConforme = () => {
        if(conforme || conforme === null){
        setConforme(false);
        }
    };

    const handleSubmit = () => {

    };

    return (
            <>
                <NavbarLeftWithRouter/>

                <div className='page-content'>
                    <p>Propreté des accès :</p>
                    <Button onClick={handleCheckConforme} className="btn btn-success" text="Conforme" type="button"/>
                    <Button onClick={handleCheckNonConforme} className="btn btn-danger ml-2" text="Non Conforme" type="button"/>
                </div>
                {(conforme &&
                <div className='page-content'>
                    <p>Ceci est conforme</p>
                </div>
                )};
                {(conforme === false &&
                <div className='page-content'>
                    <div className="row">
                    <div>
                    <form className="form-inline mb-3">
                        <Field value="Pourcentage" label="Entreprise A : " />
                        </form>
                    <form className="form-inline mb-3">
                        <Field value="Pourcentage" label="Entreprise B : " />
                        </form>
                    <form className="form-inline mb-3">
                        <Field value="Pourcentage" label="Entreprise C : " />
                    </form>
                    </div>
                    <div className="ml-auto">
                        <ImageUpload buttonText="Choisir l'image"/>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-6">
                        <FieldTextArea label="Commentaire : " placeholder="Commentaire pour toute les entreprises" />
                    </div>
                        <div className="col-6">
                        <FieldTextArea label="Commentaire interne : " placeholder="Commentaire pour toute les entreprises" />
                    </div>
                    </div>
                </div>
                )};
                <div className='page-content'>
                    <Button onClick={handleSubmit} className="btn btn-primary" text="Valider" type="submit" />
                </div>

            </>
    );
};

export default ReportPropretePage;