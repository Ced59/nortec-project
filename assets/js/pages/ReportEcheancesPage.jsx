import React from 'react';
import {withRouter} from "react-router-dom";
import NavbarLeft from "../components/navbars/NavbarLeft";
import Select from "../components/forms/Select";
import Button from "../components/forms/Button";

const ReportEcheancesPage = () => {

    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    return (
        <>
            <NavbarLeftWithRouter selected='echeances'/>

            <div className="page-content">
                <p>Echéances : </p>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Rédacteur</th>
                        <th>Statut</th>
                        <th>Catégorie</th>
                        <th>Sujet</th>
                        <th>Création</th>
                        <th>Echéance</th>
                        <th>Clotûre</th>
                        <th>Retard</th>
                        <th>En charge</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>4521</td>
                        <td>Florent</td>
                        <td>
                            <Select value="Statut">
                                <option>Terminé</option>
                                <option>En cours</option>
                                <option>Retard</option>
                                <option>Pas encore démarré</option>
                            </Select>
                        </td>
                        <td>MOQUETTE</td>
                        <td>Pose moquette RDC</td>
                        <td>02/02/2020</td>
                        <td>04/02/2020</td>
                        <td></td>
                        <td>2</td>
                        <td>Salamèche</td>
                        <td>
                            <Button className="btn btn-primary" text="Détails"/>
                        </td>
                    </tr>
                    <tr>
                        <td>75234</td>
                        <td>Cedric</td>
                        <td>
                            <Select value="Statut">
                                <option>Terminé</option>
                                <option>En cours</option>
                                <option>Retard</option>
                                <option>Pas encore démarré</option>
                            </Select>
                        </td>
                        <td>PEINTURE</td>
                        <td>Peinture de la chambre</td>
                        <td>03/12/2019</td>
                        <td>22/12/2019</td>
                        <td>03/01/2020</td>
                        <td>2</td>
                        <td>Bulbizarre</td>
                        <td>
                            <Button className="btn btn-primary" text="Détails"/>
                        </td>
                    </tr>
                    <tr>
                        <td>6542</td>
                        <td>Vincent</td>
                        <td>
                            <Select value="Statut">
                                <option>Terminé</option>
                                <option>En cours</option>
                                <option>Retard</option>
                                <option>Pas encore démarré</option>
                            </Select>
                        </td>
                        <td>PLOMBERIE</td>
                        <td>Plomberie de la salle de bain</td>
                        <td>01/03/2020</td>
                        <td>15/03/2020</td>
                        <td></td>
                        <td></td>
                        <td>Carapuce</td>
                        <td>
                            <Button className="btn btn-primary" text="Détails"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ReportEcheancesPage;