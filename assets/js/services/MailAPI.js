import axios from "axios";
import { API_URL } from "../components/configs/api_links_config";

function resetPassword(email) {
  return axios.post(API_URL + "resetPassword", email);
}

function newPassword(data) {
  return axios.post(API_URL + "newPassword", data);
}

function sendPDF(data) {
  return axios.post(API_URL + "sendPDF", data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
}

export default {
  resetPassword,
  newPassword,
  sendPDF,
};
