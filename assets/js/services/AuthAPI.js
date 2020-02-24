//Requête http authentification et stockage token
function authenticate(credentials) //TODO Rajouter les credentials quand besoin
{
    //TODO requête axios vérification credentials et récupération et stockage token

    if (credentials.username === "test@test.com" && credentials.password === "password") //simulation d'un compte utilisateur
    {
        window.localStorage.setItem("authToken", "ok"); //simulation authentification
        return true;
    }
    else
    {
        const token = window.localStorage.getItem("authToken");

        if(token)
        {
            window.localStorage.removeItem("authToken");
        }

        return false;
    }

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