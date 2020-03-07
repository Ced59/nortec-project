import React, {useEffect, useState} from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";
import fakeData from "../components/fakeDataForDev/fakeData";
import '../../css/app.css';

const ReportEffectifsPage = ({match}) => {

    const urlParams = match.params;

    const reportById = fakeData.reportById(parseInt(urlParams.idReport, 10));

    const [report, setReport] = useState(reportById);

    const NavbarLeftWithRouter = withRouter(NavbarLeft);


    const fetchReport = () => {

        setReport(reportById);

    };

    useEffect(() => {
        //TODO Normalement charge le projet à chaque fois que l'id change. Attention plus tard vérifier que tout fonctionne avec axios
        fetchReport();

    }, []);

    return (
        <main>
            <NavbarLeftWithRouter selected='effectifs'/>

            <div className='page-content'>
                <h2>Effectifs : </h2>
                <h4>Rédacteur : Cedric</h4>
                <p>Date : 06/03/2020</p>
                <table className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th>N°</th>
                        <th>Entreprise</th>
                        <th>N°Lot</th>
                        <th>Nom Lot</th>
                    </tr>
                    </thead>
                    <tbody>

                    {report ?
                        report.lots.map(lot =>
                            <tr key={lot.id}>
                                <td>{lot.id}</td>
                                <td>{lot.entreprise.nom}</td>
                                <td>{lot.numero_lot}</td>
                                <td>{lot.libelle_lot}</td>
                            </tr>
                        )
                        :
                        <p>Il n'y a pas d'effectif défini pour ce rapport</p>
                    }

                    </tbody>
                </table>

            </div>

        </main>
    );
};

export default ReportEffectifsPage;