import axios from 'axios';
import { PHOTO_API, REPORT_API } from '../components/configs/api_links_config';

function findByReport (idReport){
    return axios.get(REPORT_API +"/"+ idReport+"/photos").then(response => response.data['hydra:member'])
}

function create (photo){
    return axios.post(PHOTO_API, photo);
}

function remove (id){
    return axios.delete(PHOTO_API + "/"+ id)
}

export default {
    findByReport,
    create,
    remove
}