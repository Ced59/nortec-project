import React, {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import SearchContext from "../contexts/SearchContext";
import AuthAPI from "../services/AuthAPI";


const AdminRoute = ({path, component}) => {

    const {isAuthenticated} = useContext(AuthContext);

    const {searchValue} = useContext(SearchContext);


    return AuthAPI.isAdmin() ? <Route path={path} component={component}/> : <Redirect to="/"/>;
};

export default AdminRoute;