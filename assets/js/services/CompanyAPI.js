import axios from "axios";
import {COMPANY_API} from "../components/configs/api_links_config";

function findAll() {

    return axios.get(COMPANY_API).then(response => response.data['hydra:member']);
}

function find(id) {

    let company = axios.get(COMPANY_API + "/" + id).then(
        response => response.data
    );
    return company;
}

function update(id, company){
    return axios.put(COMPANY_API + "/" + id, company);
}

function create(company){
    return axios.post(COMPANY_API, company);
}

// -----------------------subressources
function getAnnuaire(id){
    return axios.get(COMPANY_API + "/" + id +"/annuaires").then(response => response.data['hydra:member']);
}

export default {
    findAll,
    find,
    update,
    create,
    getAnnuaire
}