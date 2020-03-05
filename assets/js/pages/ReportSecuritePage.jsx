import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import Select from "../components/forms/Select";

const ReportSecuritePage = () => {

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
            <NavbarLeftWithRouter selected='securite'/>

            <div className='page-content'>
                <p>Sécurité :</p>
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
                            <Select label="Entreprise en charge" >
                                <option>Entreprise A</option>
                                <option>Entreprise B</option>
                                <option>Entreprise C</option>
                            </Select>
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

export default ReportSecuritePage;