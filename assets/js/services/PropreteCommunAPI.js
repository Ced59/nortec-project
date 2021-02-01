import axios from "axios";
import { PROPRETE_COMMUN_IMPUTATION } from "../components/configs/api_links_config";

function createCommunImputations(CommunImputation) {
  return axios.post(PROPRETE_COMMUN_IMPUTATION, CommunImputation);
}

function updateCommunImputations(CommunImputation,id) {
  return axios.put(PROPRETE_COMMUN_IMPUTATION + "/" + id, CommunImputation);
}

export default {
  createCommunImputations,
  updateCommunImputations,
};