import React from 'react';
import {NavLink} from "react-router-dom";

import { Card, Button, CardTitle, CardImg } from 'reactstrap';

const AdminPage = ({history}) => {

    return <main className="container">
        <div className="d-flex justify-content-between items-align-center flex-wrap">
            <Card className="col-xl-5 col-12 mt-5" body inverse color="info">
                <CardTitle>Projet</CardTitle>
                <CardImg></CardImg>
                <NavLink className="btn btn-primary" to="/admin/project"> Projet </NavLink>
            </Card>
            <Card className="col-xl-5 col-12 mt-5" body inverse color="info">
                <CardTitle>Utilisateur</CardTitle>
                <CardImg></CardImg>
                <NavLink className="btn btn-secondary" to="/admin/userslist"> Utilisateur </NavLink>
            </Card>
            <Card className="col-xl-5 col-12 mt-5 mx-auto" body inverse color="info">
                <CardTitle>Entreprise</CardTitle>
                <CardImg></CardImg>
                <NavLink className="btn btn-light" to="/admin/company"> Entreprise </NavLink>
            </Card>
        </div>
    </main>

};

export default AdminPage;