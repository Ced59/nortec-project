import {UPLOAD_API} from "../components/configs/api_links_config";
import axios from "axios";

function upload(data) {
    console.log(data);

    return axios.post(UPLOAD_API, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default {
    upload
}
