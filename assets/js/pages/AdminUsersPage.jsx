import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const AdminUsersPage = ({history}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/users").then(response => response.data['hydra:member']).then(data => setUsers(data));
    }, []);

    return <main className="container">
        <div className="row">
        <h2 className="mb-4"> Utilisateurs : </h2>
        <Link
            className='btn btn-primary m-auto'
            type='button'
            to={'/newUser'}
        > Nouvel Utilisateur </Link>
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.lastName} </td>
                    <td>{user.firstName} </td>
                    <td>{user.email} </td>
                    <td></td>
                    <td></td>
                </tr>
                    )}
            </tbody>
        </table>
    </main>

};

export default AdminUsersPage;