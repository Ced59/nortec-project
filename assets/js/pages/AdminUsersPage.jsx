import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import UserApi from '../services/UsersAPI';
import UsersAPI from '../services/UsersAPI';
import '../../css/loading-icon.css';
import StatusConstAPI from "../services/StatusConstAPI";
import Pagination from '@material-ui/lab/Pagination';
import pagination_configs, {
    ADMIN_USERS_PAGE_PAGINATION_ITEMS_PER_PAGE
} from "../components/configs/pagination_configs";
import useIsMountedRef from '../components/UseIsMountedRef';


const AdminUsersPage = () => {
    const isMountedRef = useIsMountedRef();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchUsers();
    }, []);


// --------------------------- Récupérer tout les Utilisateurs -----------------------------------------

    const fetchUsers = async () => {
        try {
            const data = await UserApi.findAll();
            if (isMountedRef.current) {
                setUsers(data);
                setLoading(false);
            }
        } catch (error) {
            toast.error("Erreur lors du chargement de la liste des utilisateurs");
        }
    }


// ----------------------------- Mise en place de la pagination ------------------------------------------

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    }

    const paginationConfig = pagination_configs.determinePaginationConfig(users, ADMIN_USERS_PAGE_PAGINATION_ITEMS_PER_PAGE, currentPage);



// ----------------------------- Determination du rôle des users ------------------------------

    const determineRole = (user) => UsersAPI.determineRole(user);

// ----------------------------- Template ------------------------------------------------------------------

    return <>
        <main className="container">
            <div className="mb-4 d-flex justify-content-between align-items-center">

                <Link
                    className='btn btn-danger'
                    to={'/admin'}
                > Retour </Link>

                <h2> Utilisateurs : </h2>
                <Link
                    className='btn btn-primary'
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
                    <th>Actif</th>
                    <th/>
                    <th/>
                </tr>
                </thead>
                {!loading &&
                <tbody>
                {paginationConfig.paginatedItems.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.lastName} </td>
                        <td>{user.firstName} </td>
                        <td>{user.email} </td>
                        <td>{determineRole(user)}</td>
                        <td>{StatusConstAPI.STATUS_ACTIVE_USER[user.active]}</td>

                        <td>
                            <Link to={"/admin/user/" + user.id} className="btn btn-success">Modifier</Link>
                        </td>
                    </tr>
                )}
                </tbody>
                }
            </table>
            {loading &&
            <div id="loading-icon" className="mt-5 mb-5"/>
            }

            <div className="mt-2 d-flex justify-content-center">
                <Pagination count={paginationConfig.pagesCount}
                            color="primary"
                            page={currentPage}
                            onChange={handleChangePage}
                />
            </div>

        </main>

    </>

};

export default AdminUsersPage;



