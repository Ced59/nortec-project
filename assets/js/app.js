import React, {useState} from 'react';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from "react-dom";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./contexts/AuthContext";
import AuthAPI from "./services/AuthAPI"
import {toast, ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import ListProjectsPage from "./pages/ListProjectsPage";
import NavbarTop from "./components/navbars/NavbarTop";
import NavbarLeft from "./components/navbars/NavbarLeft";


const App = () => {

    const NavbarTopWithRouter = withRouter(NavbarTop);
    const NavbarLeftWithRouter = withRouter(NavbarLeft);

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    };

    return (

        <AuthContext.Provider value={contextValue}>


            <HashRouter>

                {isAuthenticated && <NavbarTopWithRouter/>}


                <main className="container">


                    {isAuthenticated && <NavbarLeftWithRouter/>}

                    <Switch>
                        <PrivateRoute path="/projects" component={ListProjectsPage}/>
                        {!isAuthenticated && <Route path="/" component={LoginPage}/>}
                    </Switch>

                </main>
            </HashRouter>

            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>

    );

};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);







