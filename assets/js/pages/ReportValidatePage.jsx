import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import fakeData from "../components/fakeDataForDev/fakeData";
import DateAPI from "../services/DateAPI";

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
                    <p className="mt-3"><span style={{fontWeight: 'bold'}}>Description : </span> {report.project.description}</p>
                    <p><span style={{fontWeight: 'bold'}}>Adresse 1 : </span> {report.project.adresse1}</p>
                    {report.project.adresse2 && <p><span style={{fontWeight: 'bold'}}>Adresse 2 : </span> {report.project.adresse2}</p>}
                    <p><span style={{fontWeight: 'bold'}}>Code Postal : </span> {report.project.code_postal}</p>
                    <p><span style={{fontWeight: 'bold'}}>Ville : </span> {report.project.ville}</p>





                </div>
            </div>
        </main>
    );
};

export default ReportValidatePage;