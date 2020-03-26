//Requête http authentification et stockage token
import axios from "axios";
import {LOGIN_API} from "../components/config";
import jwtDecode from "jwt-decode";

function authenticate(credentials)
{
   return axios
       .post(LOGIN_API, credentials)
       .then(response => response.data.token)
       .then(token => {

           //on stocke le token dans le localstorage
           window.localStorage.setItem("authToken", token);

           //on met un header par défaut sur les future requêtes
           setAxiosToken(token);

           return true;
       })

}


function logout()
{
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}



//Permet de voir si on est authentifié ou pas
function isAuthenticated()
{
    const token = getToken();

    // voir si token encore valide
    if (token)
    {
        const jwtData = jwtDecode(token);
        return jwtData.exp * 1000 > new Date().getTime();

    }
    return false;
}

function getUserFirstname() {

    if (isAuthenticated())
    {
        return jwtDecode(getToken()).firstName;
    }
}
function getUsername() {

    if (isAuthenticated())
    {
        return jwtDecode(getToken()).username;
    }
}

function getUserLastName() {

    if (isAuthenticated())
    {
        return jwtDecode(getToken()).lastName;
    }
}

function getUserId()
{
    if (isAuthenticated())
    {
        return jwtDecode(getToken()).id;
    }
}

function getUserFirstNameLastName() {
    return getUserFirstname() + " " + getUserLastName();
}


function setup()
{
    const token = getToken();

    if (token)
    {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime())
        {
            setAxiosToken(token);
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

//Positionne token sur Axios
function setAxiosToken(token)
{
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function getToken()
{
    return window.localStorage.getItem("authToken");
}

export default {
    authenticate,
    isAuthenticated,
    logout,
    setup,
    getUserFirstname,
    getUserLastName,
    getUserFirstNameLastName,
    getUserId,
    getUsername
}