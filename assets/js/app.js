import React, {useState} from 'react';
import '../css/app.css';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./contexts/AuthContext";
import AuthAPI from "./services/AuthAPI"
import {toast, ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import ListProjectsPage from "./pages/ListProjectsPage";


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    };

    return (

        <AuthContext.Provider value={contextValue}>

            <HashRouter>
                <main className="container">

                    <Switch>
                        <PrivateRoute path="/projects" component={ListProjectsPage}/>
                        <Route path="/" component={LoginPage}/>
                    </Switch>

                </main>
            </HashRouter>

            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>

    );

};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);







