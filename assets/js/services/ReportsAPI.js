import axios from "axios";
import {REPORT_API} from "../components/configs/api_links_config";

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

export default {
    create,
    findAll,
    findReport
}