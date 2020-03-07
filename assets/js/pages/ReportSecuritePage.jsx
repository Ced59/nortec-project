import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import Select from "../components/forms/Select";
import '../../css/app.css';
import {toast} from "react-toastify";

const ReportSecuritePage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const [conforme, setConforme] = useState(null);

    const handleCheckConforme = () => {
        if (!conforme || conforme === false) {
            setConforme(true);
        }
    };

    const handleCheckNonConforme = () => {
        if (conforme || conforme === null) {
            setConforme(false);
        }
    };

    const handleSubmit = () => {

    };

    const handleSubmitConform = () => {
        //TODO enregistrement de la conformité à true
        toast.success("Statut de sécurité enregistré avec succès!")
    };

    return (
        <main className="container">
            <NavbarLeftWithRouter selected='securite'/>

            <div className='page-content'>
                <div className='ml-2 mt-4 d-flex justify-content-between mb-3'>
                    <h2 className="mb-4">Sécurité :</h2>
                    <Button onClick={handleCheckConforme} className="btn btn-success mb-4" text="Conforme"
                            type="button"/>
                    <Button onClick={handleCheckNonConforme} className="btn btn-danger ml-5 mb-4" text="Non Conforme"
                            type="button"/>
                </div>

                {(conforme &&

                    <div className='card mt-3'>
                        <div className='row ml-2 d-flex justify-content-center mt-3'>
                            <h4 className='mb-4'>Sécurité conforme ?</h4>
                        </div>
                        <div className='row ml-2 d-flex justify-content-center'>
                            <Button onClick={handleSubmitConform} className="btn btn-info mb-4 row" text="Valider"
                                    type="button"/>
                        </div>
                    </div>

                )}
                {(conforme === false &&
                    <>
                        <div className="row">
                            <div>
                                <Select label="Entreprise en charge">
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
                                <FieldTextArea label="Commentaire : "
                                               placeholder="Commentaire pour toute les entreprises"/>
                            </div>
                            <div className="col-6">
                                <FieldTextArea label="Commentaire interne : "
                                               placeholder="Commentaire pour toute les entreprises"/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default ReportSecuritePage;