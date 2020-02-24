//Requête http authentification et stockage token
function authenticate(credentials) //TODO Rajouter les credentials quand besoin
{
    //TODO requête axios vérification credentials et récupération et stockage token
    window.localStorage.setItem("authToken", "ok"); //simulation authentification
    return true;
}



function isAuthenticated()
{
    const token = window.localStorage.getItem("authToken");

    //TODO voir si token encore valide
    if (token)
    {

        return true //simulation encore valide s'il existe

    }
    return false;
}

export default {
    authenticate,
    isAuthenticated
}