import React, {useState} from 'react';
import AuthAPI from "../services/AuthAPI";


const ProfilPage = ({history}) => {

    const [FirstNameUser] = useState(AuthAPI.getUserFirstname());
    const [LastNameUser] = useState(AuthAPI.getUserLastName());
    const [MailUser] = useState(AuthAPI.getUsername());
    const [edit, setEdit] = useState(false);

    const ChangeMail = () => {
        setEdit(true);
    }

    return <main className="container">
            <h3>Information du Profil :</h3>
            <div className="row">
                <div className="ml-4 mt-4">Prénom : {FirstNameUser} </div>
            </div>
            <div className="row">
                <div className="ml-4 mt-4">Nom : {LastNameUser}</div>
            </div>
            <div className="row">
                <div className="ml-4 mt-4">Mail : {MailUser} </div>
                <button className="btn btn-primary" onClick={() => ChangeMail()}> Modifier </button>
            </div>
        </main>


};

export default ProfilPage;