import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import Select from "../components/forms/Select";
import '../../css/app.css';

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
        <main className="container">
            <NavbarLeftWithRouter selected='securite'/>

            <div className='page-content'>
                <div className='ml-2 mr-5 mt-4 d-flex justify-content-between mb-3'>
                    <h2>Sécurité :</h2>
                    <Button onClick={handleCheckConforme} className="btn btn-success mb-4" text="Conforme"
                            type="button"/>
                    <Button onClick={handleCheckNonConforme} className="btn btn-danger ml-5 mb-4" text="Non Conforme"
                            type="button"/>
                </div>

            {(conforme &&

                    <p className='ml-2'>Ceci est conforme</p>

            )}
            {(conforme === false &&
                <>
                    <div className="row ml-2 mr-3">
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
                    <div className="row ml-1 mr-3">
                        <div className="col-6">
                            <FieldTextArea label="Commentaire : " placeholder="Commentaire pour toute les entreprises" />
                        </div>
                        <div className="col-6">
                            <FieldTextArea label="Commentaire interne : " placeholder="Commentaire pour toute les entreprises" />
                        </div>
                    </div>
                </>
            )}
            </div>
        </main>
    );
};

export default ReportSecuritePage;