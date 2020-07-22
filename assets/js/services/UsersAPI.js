import axios from "axios";
import {USERS_API} from "../components/config";

function findAll(){
    return axios.get(USERS_API).then(response => response.data['hydra:member']);
}

function find(id) {

    const response = axios.get(USERS_API + "/" + id).then(
        response => response.data
    );
    console.log(response);
    return response;
}

function update(id, user){
    return axios.put(USERS_API + "/" + id, user);
}

function create(user){
    return axios.post(USERS_API, user);
}



function determineRole(user) {

    if (user.roles.includes('ROLE_ADMIN'))
    {
        return 'Administrateur';
    }
    else
    {
        return 'Utilisateur';
    }
}

export default {
    find,
    update,
    create,
    findAll,
    determineRole
}
