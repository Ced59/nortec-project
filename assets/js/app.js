import React from 'react';
import '../css/app.css';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {HashRouter, Switch, Route} from "react-router-dom";



const App = () => {
    return (
        <main className="container pt-5">

            <Switch>
                <Route path="/" component={LoginPage}/>
            </Switch>

        </main>
)
    ;
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);







