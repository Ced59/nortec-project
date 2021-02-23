import axios from "axios";
import { ECHEANCE_API } from "../components/configs/api_links_config";

function findEcheance(id) {
  let echeance = axios
    .get(ECHEANCE_API + "/" + id)
    .then((response) => response.data);
  return echeance;
}

function create(echeance) {
  return axios.post(ECHEANCE_API, echeance);
}

function update(id, echeance) {
  return axios.put(ECHEANCE_API + "/" + id, echeance);
}

export default {
  create,
  findEcheance,
  update,
};
