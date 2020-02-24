import React from 'react';
import '../css/app.css';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./components/page/LoginPage";


const App = () => {
    return (
        <HashRouter>
            <main className="container">

                <Switch>
                    <Route path="/" component={LoginPage}/>
                </Switch>

            </main>
        </HashRouter>
    );

};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);







