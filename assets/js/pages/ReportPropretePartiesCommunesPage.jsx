import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Button from "../components/forms/Button";
import FieldTextArea from "../components/forms/FieldTextArea";
import ImageUpload from "../components/forms/ImageUpload";
import fakeData from "../components/fakeDataForDev/fakeData";
import '../../css/app.css';
import {toast} from "react-toastify";

const ReportPropretePartiesCommunesPage = ({match}) => {

    const [conforme, setConforme] = useState(null);
    const [comment, setComment] = useState("");
    const [commentIntern, setCommentIntern] = useState("");

    const [imputations, setImputations] = useState("");
    const [percentImputations, setPercentImputations] = useState(
        []
    );

    const urlParams = match.params;
    const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const fetchReport = () => {

        //Vérification si édition ou nouveau rapport... Dans la version finale, le nouveau rapport existera mais avec valeurs vides donc pas de vérification à ce niveau
        if (reportById) {
            setConforme(reportById.propreteCommuneConformity);
            setComment(reportById.propreteCommuneComment);
            setCommentIntern(reportById.propreteCommuneCommentIntern);
            setImputations(reportById.proprete_commune_imputation);
            setPercentImputations(reportById.proprete_commune_imputation);
        }

    };

    useEffect(() => {

        fetchReport();

    }, []);

    const handleCheckConforme = () => {
        if (!conforme || conforme === false) {
            setConforme(true);
        }
    };

    const handleChangeImputations = ({currentTarget}) => {


        console.log(currentTarget.id);

        console.log(currentTarget.value);

        const imputs = imputations;
        imputs[currentTarget.id].pourcent = parseInt(currentTarget.value, 10);

        setImputations("");
        setImputations(imputs);

        console.log(imputations);

    };

    const handleChangePercentImputations = ({currentTarget}) => {


        console.log(currentTarget.id);

        console.log(currentTarget.value);

        const imputs = percentImputations;
        imputs[currentTarget.id].pourcent = parseInt(currentTarget.value, 10);

        setPercentImputations("");
        setPercentImputations(imputs);

        console.log(imputations);

    };

    const handleCheckNonConforme = () => {
        if (conforme || conforme === null) {
            setConforme(false);
        }
    };

    const handleSubmit = () => {

    };

    const handleChangeCommentIntern = ({currentTarget}) => {
        const value = currentTarget.value;

        setCommentIntern(value);
    };

    const handleChangeComment = ({currentTarget}) => {
        const value = currentTarget.value;

        setComment(value);

    };

    const handleSubmitConform = () => {
        //TODO enregistrement de la conformité à true
        toast.success("Statut de la propreté des parties communes enregistré avec succès!")
    };


    return (
        <main className="container">
            <NavbarLeftWithRouter selected='propetepartiecommune'/>

            <div className='page-content'>
                <div className='row ml-2 mt-4 d-flex justify-content-between mb-3'>
                    <h2 className="mb-4">Propreté parties communes :</h2>
                    <Button onClick={handleCheckConforme} className="btn btn-success mb-4" text="Conforme"
                            type="button"/>
                    <Button onClick={handleCheckNonConforme} className="btn btn-danger ml-5 mb-4" text="Non Conforme"
                            type="button"/>
                </div>

            {(conforme &&

                <div className='card mt-3'>
                    <div className='row ml-2 d-flex justify-content-center mt-3'>
                        <h4 className='mb-4'>Propreté des parties communes conforme ?</h4>
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
                            <form>

                                <div className="col-12">

                                    {imputations.map(imputation =>

                                        <div className="row" key={imputation.id}>
                                            <h5 className="col-5">{imputation.company.nom}</h5>

                                            <FieldTextArea
                                                value={imputation.commentaire}
                                                className="form-control col-6 mb-1 mr-1"
                                                name={"name" + imputation.company.id}
                                                onChange={handleChangeImputations}
                                            />
                                            <input
                                                value={imputation.percent}
                                                className="form-control col-2 mb-1 ml-1 mt-4"
                                                name={"name" + imputation.company.id}
                                                onChange={handleChangePercentImputations}
                                                id={imputation.company.id}
                                            />
                                            <h5>%</h5>
                                        </div>
                                    )}

                                    <Button onClick={handleCheckNonConforme}
                                            className="btn btn-info offset-10 col-2 mb-4 mt-3" text="Valider"
                                            type="button"/>
                                </div>

                            </form>
                        </div>
                        <div className="ml-auto">
                            <ImageUpload buttonText="Choisir l'image"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <FieldTextArea label="Commentaire : " value={comment} placeholder="Commentaire pour toute les entreprises" onChange={handleChangeComment}/>
                        </div>
                        <div className="col-6">
                            <FieldTextArea label="Commentaire interne : "
                                           value={commentIntern}
                                           placeholder="Commentaire pour toute les entreprises" onChange={handleChangeCommentIntern}/>
                        </div>
                    </div>
                </>
            )}

            </div>
        </main>
    );
};

export default ReportPropretePartiesCommunesPage;