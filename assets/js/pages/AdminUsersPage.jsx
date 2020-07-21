import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import UserApi from '../services/UserApi';
import '../../css/loading-icon.css';
import '../../css/pagination-centered.css'

const AdminUsersPage = ({history}) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchUsers().then(r => "");
    }, []);

// --------------------------- Récupérer tout les Utilisateurs ---------------------------

    const fetchUsers = async () => {
        try {
            const data = await UserApi.findAll();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            toast.error("Erreur lors du chargement de la liste des utilisateurs");
        }
    }

//------------------------------Suppression d'un Utilisateur ------------------------------

    const handleDelete = async id => {

        const originalUsers = [...users];

        setUsers(users.filter(user => user.id !== id));

        try {
            await UserApi.deleteUser(id)
            toast.success("L'utilisateur a bien été supprimé !");
        } catch (error) {
            setUsers(originalUsers);
            toast.error("L'utilisateur n'a pas été correctement supprimé !");
        }

    }

// ----------------------------- Mise en place de la pagination ------------------------------

    const handleChangePage = page => {
        setCurrentPage(page);
    }

    const itemsPerPage = 8;
    const pagesCount = Math.ceil(users.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedUsers = users.slice(start, start + itemsPerPage)


    return <main className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
            <h2> Utilisateurs : </h2>
            <Link
                className='btn btn-primary'
                type='button'
                to={'/admin/user/new'}
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
                <th></th>
            </tr>
            </thead>
            {!loading &&
            <tbody>
            {paginatedUsers.map(user =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.lastName} </td>
                    <td>{user.firstName} </td>
                    <td>{user.email} </td>
                    <td></td>
                    <td>
                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Supprimer</button>
                    </td>
                    <td>
                        <Link to={"/admin/user/" + user.id} className="btn btn-success">Modifier</Link>
                    </td>
                </tr>
            )}
            </tbody>
            }
        </table>
        {loading &&
        <div id="loading-icon" class="mt-5 mb-5"></div>
        }


        <div class="mt-2">
            <ul className="pagination pagination-sm justify-content-center">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>&laquo;</button>
                </li>
                {pages.map(page =>
                    <li key={page} className={"page-item" + (currentPage === page && " active")}>
                        <button className="page-link" onClick={() => handleChangePage(page)}>{page}</button>
                    </li>
                )}

                <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                    <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    </main>

};

export default AdminUsersPage;
