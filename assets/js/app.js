import React from 'react';
import '../css/app.css';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';



const App = () => {
    return (
        <h1>
        Salut
        </h1>
)
    ;
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);







