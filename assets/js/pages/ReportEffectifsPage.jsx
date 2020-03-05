import React from 'react';
import NavbarLeft from "../components/navbars/NavbarLeft";
import '../../css/report.css'
import {withRouter} from "react-router-dom";

const ReportEffectifsPage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
        <>
            <NavbarLeftWithRouter selected='effectifs'/>

            <div className='page-content'>
                <p>Rédacteur : Cedric</p>
                <p>Date : 06/03/2020</p>
                <p>Effectifs : </p>
                <table>
                    <thead>
                    <tr>
                        <th>N°</th>
                        <th>Entreprise</th>
                        <th>N°Lot</th>
                        <th>Nom Lot</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Tartinade</td>
                        <td>5468</td>
                        <td>Pose Moquette</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Clafouti</td>
                        <td>8796</td>
                        <td>Tuyauterie</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Tiramisu</td>
                        <td>7482</td>
                        <td>Coulage de Beton</td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </>
    );
};

export default ReportEffectifsPage;