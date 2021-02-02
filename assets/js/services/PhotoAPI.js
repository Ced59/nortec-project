import axios from 'axios';
import { PHOTO_API } from '../components/configs/api_links_config';

function create (photo){
    return axios.post(PHOTO_API, photo);
}

export default {
    create
}