import axios from "axios";
import { SECURITE_IMPUTATION } from "../components/configs/api_links_config";

function createSecuriteImputations(SecuriteImputation) {
  return axios.post(SECURITE_IMPUTATION, SecuriteImputation);
}

function updateSecuriteImputations(SecuriteImputation,id) {
  return axios.put(SECURITE_IMPUTATION + "/" + id, SecuriteImputation);
}

export default {
  createSecuriteImputations,
  updateSecuriteImputations,
};
