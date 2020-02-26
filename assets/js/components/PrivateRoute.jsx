import React, {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import SearchContext from "../contexts/SearchContext";


const PrivateRoute = ({path, component}) => {

    const {isAuthenticated} = useContext(AuthContext);

    const {searchValue} = useContext(SearchContext);

    return isAuthenticated ? <Route path={path} component={component}/> : <Redirect to="/"/>;
};

export default PrivateRoute;