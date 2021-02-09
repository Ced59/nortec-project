import axios from "axios";

function resetPassword(email){
    return axios.post("https://localhost:8000/resetPassword",email);
}

function newPassword(data){
    return axios.post("https://localhost:8000/newPassword",data);
}

function sendPDF(data) {
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default {
    resetPassword,
    newPassword,
    sendPDF
}
