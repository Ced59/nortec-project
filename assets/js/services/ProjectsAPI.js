import axios from "axios";
import {DATE_FIN_PREVUE_API, PROJECTS_API, LOT_API} from "../components/configs/api_links_config";

function findAll() {

    return axios.get(PROJECTS_API).then(response => response.data['hydra:member'])
}

function find(id) {

    let project = axios.get(PROJECTS_API + "/" + id).then(
        response => response.data
    );

    return project;
}

function update(id, project){
    return axios.put(PROJECTS_API + "/" + id, project);
}

function create(project){

    return axios.post(PROJECTS_API, project);
}

function addFinPrevueProject(dateToCreate) {

    return axios.post(DATE_FIN_PREVUE_API, dateToCreate);
}

function addLotProject(lotToAdd) {

    return axios.post(LOT_API, lotToAdd);
}

// -----------------------subressources
function getReports(id){
    return axios.get(PROJECTS_API + "/" + id +"/reports").then(response => response.data['hydra:member']);
}

export default {
    find,
    update,
    create,
    findAll,
    addFinPrevueProject,
    addLotProject,
    getReports
}
