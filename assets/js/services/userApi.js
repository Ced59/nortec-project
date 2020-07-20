const { default: Axios } = require("axios");

function findAll(){
    return Axios.get("http://localhost:8000/api/users").then(response => response.data['hydra:member']);
}

function find(id) {
    return Axios.get("http://localhost:8000/api/users/" + id).then(response => response.data);
}

function update(id, user){
    return Axios.put("http://localhost:8000/api/users/" + id, user);
}

function create(user){
    return Axios.post("http://localhost:8000/api/users", user);
}

function deleteUser(id){
    return Axios.delete("http://localhost:8000/api/users/" + id);
}

export default {
    find,
    update,
    create,
    deleteUser,
    findAll
}