import React from 'react';
import {NavLink} from "react-router-dom";

const AdminPage = ({history}) => {

    return <main className="container">
        <NavLink className="btn btn-primary" to="/admin/project"> Projet </NavLink>
        <NavLink className="btn btn-secondary" to="/admin/userslist"> Utilisateur </NavLink>
    </main>

};

export default AdminPage;