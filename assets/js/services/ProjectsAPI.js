import axios from "axios";
import {DATE_FIN_PREVUE_API, PROJECTS_API} from "../components/configs/api_links_config";

function findAll() {

    return axios.get(PROJECTS_API).then(response => response.data['hydra:member'])
}

function find(id) {

    let project = axios.get(PROJECTS_API + "/" + id).then(
        response => response.data
    );

    console.log(project);

    return project;
}

function update(id, project){
    return axios.put(PROJECTS_API + "/" + id, project);
}

function create(project){

    project.dateFinReelle = "1900-01-01";

    return axios.post(PROJECTS_API, project);
}

function addFinPrevueProject(dateToCreate) {

    return axios.post(DATE_FIN_PREVUE_API, dateToCreate);
}

export default {
    find,
    update,
    create,
    findAll,
    addFinPrevueProject
}
