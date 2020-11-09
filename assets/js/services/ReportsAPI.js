import axios from "axios";
import {REPORT_API, PROPRETE_ACCESS_IMPUTATION} from "../components/configs/api_links_config";

function findAll () {
    return axios.get(REPORT_API).then(response => response.data['hydra:member'])
}

function findReport(id) {

    let report = axios.get(REPORT_API + "/" + id).then(
        response => response.data
    );

    return report;
}

function create (report) {
    return axios.post(REPORT_API, report);
}

function update(id, report){
    return axios.put(REPORT_API + "/" + id, report);
}

function createPropreteAccessImputations (propreteAccessImputation) {
    return axios.post(PROPRETE_ACCESS_IMPUTATION, propreteAccessImputation);
}

export default {
    create,
    findAll,
    findReport,
    update
}