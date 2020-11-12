import axios from "axios";
import { PROPRETE_ACCESS_IMPUTATION } from "../components/configs/api_links_config";

function findAll() {
  return axios
    .get(PROPRETE_ACCESS_IMPUTATION)
    .then((response) => response.data["hydra:member"]);
}

function createPropreteAccessImputations(propreteAccessImputation) {
  return axios.post(PROPRETE_ACCESS_IMPUTATION, propreteAccessImputation);
}

function updatePropreteAccessImputations(propreteAccessImputation) {
  return axios.put(PROPRETE_ACCESS_IMPUTATION, propreteAccessImputation);
}

export default {
  findAll,
  createPropreteAccessImputations,
  updatePropreteAccessImputations,
};
