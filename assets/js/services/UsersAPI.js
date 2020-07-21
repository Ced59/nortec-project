import axios from "axios";
import {USERS_API} from "../components/config";

function findAll(){
    return axios.get(USERS_API).then(response => response.data['hydra:member']);
}

function find(id) {
    return axios.get(USERS_API + "/" + id).then(response => response.data);
}

function update(id, user){
    return axios.put(USERS_API + "/" + id, user);
}

function create(user){
    return axios.post(USERS_API, user);
}

function deleteUser(user){
    console.log(user);
    //TODO Voir ce qui ne va pas avec la requête... Je ne comprends pas...
    return axios.put(USERS_API + "/" + id, user);
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
    deleteUser,
    findAll,
    determineRole
}
