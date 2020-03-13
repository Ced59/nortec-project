import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";
import Button from "../components/forms/Button";

const ReportValidatePage = ({match}) => {
    const urlParams = match.params;

    const [report, setReport] = useState(fakeData.reportById(parseInt(urlParams.idReport, 10)));

    const NavbarLeftWithRouter = withRouter(NavbarLeft);


    const fetchReport = () => {

        const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

        if (reportById) {
            setReport(reportById);
            console.log(reportById);
            console.log(report);
        }

    };

    useEffect(() => {

        fetchReport();

    }, []);

    return (
        <main className="container">
            <NavbarLeftWithRouter selected='validate'/>

            <div className='page-content'>
                <h3>Résumé du rapport du {DateAPI.formatDateHours(report.dateRedaction)} :</h3>

                <div className="card m-4 p-2">
                    <h5 className="mt-3"><span style={{fontWeight: 'bold'}}>Projet :</span> {report.project.name}</h5>
                    <p className="mt-3"><span
                        style={{fontWeight: 'bold'}}>Description : </span> {report.project.description}</p>
                    <p><span style={{fontWeight: 'bold'}}>Adresse 1 : </span> {report.project.adresse1}</p>
                    {report.project.adresse2 &&
                    <p><span style={{fontWeight: 'bold'}}>Adresse 2 : </span> {report.project.adresse2}</p>}
                    <p><span style={{fontWeight: 'bold'}}>Code Postal : </span> {report.project.code_postal}</p>
                    <p><span style={{fontWeight: 'bold'}}>Ville : </span> {report.project.ville}</p>
                </div>

                <div className="card m-4 p-2">
                    <h4 className="mb-3">Effectifs Semaine 1 (du 01/01/2020 au 07/01/2020)</h4>

                    <table className="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>Entreprise</th>
                            <th>N°Lot</th>
                            <th>Nom Lot</th>
                            <th className="text-center">Effectif Prévu</th>
                            <th className="text-center">Effectif Constaté</th>
                        </tr>
                        </thead>
                        <tbody>
                        {report.lots.map(lot =>
                            <tr key={lot.id}>
                                <td style={{fontWeight: 'bold'}}>{lot.entreprise.nom}</td>
                                <td>{lot.numero_lot}</td>
                                <td>{lot.libelle_lot}</td>
                                <td className="text-center">{lot.effectif_prevu}</td>
                                <td className="text-center">{lot.effectif_constate}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>

                <div className="card m-4 p-2">
                    {report.security_conformity
                        ?
                        <h5>Sécurité conforme</h5>
                        :
                        <>
                            <h4 className="mb-3">Sécurité non conforme</h4>
                            <ul>
                                {report.security_comment_imputations.map(imputation =>
                                    <div key={imputation.id}>
                                        {imputation.commentaire &&
                                        <li>
                                            <h6>Entreprise : {imputation.company.nom}</h6>
                                            <p className="ml-2">{imputation.commentaire}</p>
                                        </li>
                                        }

                                    </div>
                                )}
                            </ul>
                        </>
                    }
                </div>
                <div className="card m-4 p-2">

                    {report.proprete_access_conformity === "conform" &&
                    <h4>Propreté des accès conforme</h4>
                    }
                    {report.proprete_access_conformity === "prorata" &&
                    <h4>Propreté des accès au prorata</h4>
                    }
                    {report.proprete_access_conformity === "noconform" &&
                    <>
                        <h4 className="mb-3">Propreté des accès non conforme</h4>
                        <ul>
                            {report.proprete_access_imputation.map(imputation =>
                                <div key={imputation.id}>
                                    {imputation.pourcent !== 0 &&
                                    <li>
                                        <h6>Entreprise : {imputation.company.nom}</h6>
                                        <p className="ml-2">{'Pourcentage imputation : ' + imputation.pourcent + ' %'}</p>
                                    </li>
                                    }

                                </div>
                            )}
                        </ul>
                        <h6>Commentaire : </h6>
                        <p className="ml-3">{report.proprete_access_comment}</p>
                        <h6>Commentaire interne (non visible sur le rapport final): </h6>
                        <p className="ml-3">{report.proprete_access_comment_intern}</p>
                    </>
                    }
                </div>
                <div className="card m-4 p-2">
                    {report.proprete_commune_conformity &&
                    <h4>Propreté des parties communes conforme</h4>
                    }

                    {!report.proprete_commune_conformity &&
                    <>
                        <h4 className="mb-3">Propreté des parties communes non conforme</h4>
                        <ul>
                            {report.proprete_commune_imputation.map(imputation =>
                                <div key={imputation.id}>
                                    {imputation.commentaire !== "" &&
                                    <li>
                                        <h6>Entreprise : {imputation.company.nom}</h6>
                                        <p className="ml-2">{'Pourcentage imputation : ' + imputation.percent + ' %'}</p>
                                        <p className="ml-2 mt-0">{'Commentaire : ' + imputation.commentaire}</p>
                                    </li>
                                    }

                                </div>
                            )}
                        </ul>
                        <h6>Commentaire : </h6>
                        <p className="ml-3">{report.proprete_access_comment}</p>
                        <h6>Commentaire interne (non visible sur le rapport final): </h6>
                        <p className="ml-3">{report.proprete_access_comment_intern}</p>
                    </>
                    }
                </div>
                <div className="card m-4 p-2">
                    echeances
                </div>

                <div className='row ml-2 mt-4 d-flex justify-content-between mb-3'>
                    <Button text='Clôturer et envoyer'
                            className='btn btn-primary mr-4'
                            type='button'
                    />
                    <Button text='Faire valider par Admin'
                            className='btn btn-primary mr-4'
                            type='button'
                    />
                    <Link
                        className='btn btn-primary'
                        type='button'
                        to={'/project/' + urlParams.id}
                    >
                        Retour au projet
                    </Link>
                </div>

            </div>
        </main>
    );
};

export default ReportValidatePage;