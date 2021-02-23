import axios from "axios";
import { REPORT_API } from "../components/configs/api_links_config";

function findReport(id) {
  let report = axios
    .get(REPORT_API + "/" + id)
    .then((response) => response.data);

  return report;
}

function create(report) {
  return axios.post(REPORT_API, report);
}

function update(id, report) {
  return axios.put(REPORT_API + "/" + id, report);
}

// ------------subressources-------------------

function getEcheances(idReport) {
  return axios
    .get(REPORT_API + "/" + idReport + "/echeances")
    .then((response) => response.data["hydra:member"]);
}

export default {
  create,
  findReport,
  update,
  getEcheances,
};
