import axios from "axios";
import { PROPRETE_ACCESS_IMPUTATION } from "../components/configs/api_links_config";

function createPropreteAccessImputations(propreteAccessImputation) {
  return axios.post(PROPRETE_ACCESS_IMPUTATION, propreteAccessImputation);
}

function updatePropreteAccessImputations(propreteAccessImputation,id) {
  return axios.put(PROPRETE_ACCESS_IMPUTATION + "/" + id, propreteAccessImputation);
}

export default {
  createPropreteAccessImputations,
  updatePropreteAccessImputations,
};
