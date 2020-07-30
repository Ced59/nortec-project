import React from 'react';
import {NavLink} from "react-router-dom";

import { Card, Button, CardTitle, CardImg } from 'reactstrap';

const AdminPage = ({history}) => {

    return <main className="container">
        <div className="d-flex justify-content-between items-align-center">
        <Card className="col-5 mt-5" body inverse color="info">
            <CardTitle>Projet</CardTitle>
            <CardImg></CardImg>
            <NavLink className="btn btn-primary" to="/admin/project"> Projet </NavLink>
        </Card>
        <Card className="col-5 mt-5" body inverse color="info">
            <CardTitle>Utilisateur</CardTitle>
            <CardImg></CardImg>
            <NavLink className="btn btn-secondary" to="/admin/userslist"> Utilisateur </NavLink>
        </Card></div>
        <div className="d-flex justify-content-center">
        <Card className="col-5 mt-5 item-flex-grow-4" body inverse color="info">
            <CardTitle>Entreprise</CardTitle>
            <CardImg></CardImg>
            <NavLink className="btn btn-light" to="/admin/company"> Utilisateur </NavLink>
        </Card>
        </div>

    </main>

};

export default AdminPage;