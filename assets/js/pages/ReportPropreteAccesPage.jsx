import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import Field from "../components/forms/Field";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import fakeData from "../components/fakeDataForDev/fakeData";
import '../../css/app.css';
import {toast} from "react-toastify";

const ReportPropreteAccesPage = ({match}) => {

    const [conforme, setConforme] = useState("");
    const [report, setReport] = useState("");
    const [comment, setComment] = useState("");
    const [commentIntern, setCommentIntern] = useState("");

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const urlParams = match.params;
    const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));


    const fetchReport = () => {

        //Vérification si édition ou nouveau rapport... Dans la version finale, le nouveau rapport existera mais avec valeurs vides donc pas de vérification à ce niveau
        if (reportById) {
            setReport(reportById);
            setConforme(reportById.proprete_access_conformity);
            setComment(reportById.proprete_access_comment);
            setCommentIntern(reportById.proprete_access_comment_intern);
        }

    };

    useEffect(() => {

        fetchReport();

    }, []);


    const handleCheckConforme = () => {
        if (conforme !== "conform") {
            setConforme("conform");
        }
    };

    const handleCheckProrata = () => {
        if (conforme !== "prorata") {
            setConforme("prorata");
        }
    };

    const handleCheckNonConforme = () => {
        if (conforme !== "noconform") {
            setConforme("noconform");
        }
    };

    const handleSubmit = () => {

    };

    const handleSubmitConform = () => {
        //TODO enregistrement de la conformité à conform
        toast.success("Statut de la propreté des accès enregistré avec succès!")
    };

    const handleSubmitProrata = () => {
        //TODO enregistrement de la conformité à prorata
        toast.success("Statut de la propreté des accès enregistré avec succès!")
    };




    return (
        <main className="container">
            <NavbarLeftWithRouter selected='proprete'/>

            <div className='page-content'>
                <div className='row ml-2 mt-4 d-flex justify-content-between mb-3'>
                    <h2 className="mb-4">Propreté des accès :</h2>
                    <Button onClick={handleCheckConforme} className="btn btn-success mb-4" text="Conforme"
                            type="button"/>
                    <Button onClick={handleCheckProrata} className="btn btn-warning ml-5 mb-4" text="Prorata"
                            type="button"/>
                    <Button onClick={handleCheckNonConforme} className="btn btn-danger ml-5 mb-4" text="Non Conforme"
                            type="button"/>
                </div>

                {(conforme === "conform" &&

                    <div className='card mt-3'>
                        <div className='row ml-2 d-flex justify-content-center mt-3'>
                            <h4 className='mb-4'>Propreté des accès conforme ?</h4>
                        </div>
                        <div className='row ml-2 d-flex justify-content-center'>
                            <Button onClick={handleSubmitConform} className="btn btn-info mb-4 row" text="Valider"
                                    type="button"/>
                        </div>
                    </div>

                )}
                {(conforme === "prorata" &&

                    <div className='card mt-3'>
                        <div className='row ml-2 d-flex justify-content-center mt-3'>
                            <h4 className='mb-4'>Propreté des accès au prorata ?</h4>
                        </div>
                        <div className='row ml-2 d-flex justify-content-center'>
                            <Button onClick={handleSubmitProrata} className="btn btn-info mb-4 row" text="Valider"
                                    type="button"/>
                        </div>
                    </div>

                )}
                {(conforme === "noconform" &&

                    <>
                        <div className="row">
                            <div>
                                <form className="form-inline mb-3">
                                    <Field value="Pourcentage" label="Entreprise A : "/>
                                </form>
                                <form className="form-inline mb-3">
                                    <Field value="Pourcentage" label="Entreprise B : "/>
                                </form>
                                <form className="form-inline mb-3">
                                    <Field value="Pourcentage" label="Entreprise C : "/>
                                </form>
                            </div>
                            <div className="ml-auto">
                                <ImageUpload buttonText="Choisir l'image"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FieldTextArea label="Commentaire : "
                                               placeholder="Commentaire pour toute les entreprises"
                                               value={comment}
                                />
                            </div>
                            <div className="col-6">
                                <FieldTextArea label="Commentaire interne : "
                                               placeholder="Commentaire pour toute les entreprises"
                                               value={commentIntern}
                                />
                            </div>
                        </div>
                    </>

                )}


            </div>
        </main>
    );
};

export default ReportPropreteAccesPage;