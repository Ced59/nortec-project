import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/loading-icon.css';
import CompanyAPI from '../services/CompanyAPI';
import useIsMountedRef from "../components/UseIsMountedRef";
import { toast } from 'react-toastify';

const AdminCompaniesPage = () => {
    const isMountedRef = useIsMountedRef();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to load all company
    const fetchCompanies = async () => {
        try {
            const data = await CompanyAPI.findAll();
            if (isMountedRef.current) {
                setCompanies(data);
                setLoading(false);
            }
        } catch (error) {
            toast.error("Erreur lors du chargement de la liste des entreprises");
            console.log(error.response);
            console.log(error);
        }
    }

    // Loading Company during loading page
    useEffect(() => {
        fetchCompanies().then(r => "");
    }, []);

    return <main className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
            <Link
                className='btn btn-danger'
                to={'/admin'}
            > Retour </Link>
            <h2> Entreprises : </h2>
            <Link
                className='btn btn-primary'
                to={"/admin/company/new"}
            > Ajouter une Entreprise </Link>
        </div>
        <table className="table table-hover">
            <thead>
            <tr>
                <th className="text-center">Nom Entreprise</th>
                <th className="text-center">Adresse</th>
                <th className="text-center">Code Postal</th>
                <th className="text-center">Ville</th>
                <th/>
            </tr>
            </thead>
            {!loading &&
            <tbody>
            {companies.map(company => 
                <tr key={company.id}>
                    <td className="text-center">{company.nom}</td>
                    <td className="text-center">{company.adresse1}<br/>{company.adresse2}</td>
                    <td className="text-center">{company.codePostal}</td>
                    <td className="text-center">{company.ville}</td>
                    <td>
                        <Link className="btn btn-primary" to={'/admin/company/' + company.id}> Modifier </Link>
                    </td>
                </tr>
                )
            }
            </tbody>
            }
        </table>
        {loading &&
        <div id="loading-icon" className="mt-5 mb-5"/>
        }
    </main>;
}
 
export default AdminCompaniesPage;
