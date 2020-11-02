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

function find(id) {
  return axios.get(ANNUAIRE_API + "/" + id, id).then((response) => response.data);
}

function create(contact) {
  return axios.post(ANNUAIRE_API, contact);
}

function update(id, contact) {
  return axios.put(ANNUAIRE_API + "/" + id, contact);
}

function deleteContact(id){
  return axios.delete(ANNUAIRE_API + "/" + id);
}

function findAll() {
  return axios
    .get(ANNUAIRE_API)
    .then((response) => response.data["hydra:member"]);
}

export default {
  findByCompany,
  findByLot,
  find,
  create,
  update,
  deleteContact,
  findAll,
};
