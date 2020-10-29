import axios from "axios";
import {
  ANNUAIRE_API,
  COMPANY_API,
  LOT_API,
} from "../components/configs/api_links_config";

function findByCompany(id) {
  return axios
    .get(COMPANY_API + "/" + id + "annuaires")
    .then((response) => response.data["hydra:member"]);
}

function findByLot(id) {
  return axios
    .get(LOT_API + "/" + id + "annuaires")
    .then((response) => response.data);
}

function create(contact) {
  return axios.post(ANNUAIRE_API, contact);
}

function findAll() {
  return axios.get(ANNUAIRE_API).then((response) => response.data["hydra:member"]);
}

export default {
  findByCompany,
  findByLot,
  create,
  findAll
};
