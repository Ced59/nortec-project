const { default: Axios } = require("axios");

function find(id) {
    return Axios.get("http://localhost:8000/api/users/" + id).then(response => response.data);
}

function update(id, user){
    return Axios.put("http://localhost:8000/api/users/" + id, user);
}

function create(user){
    return Axios.post("http://localhost:8000/api/users", user);
}

export default {
    find,
    update,
    create
}