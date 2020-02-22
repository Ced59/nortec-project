import React from 'react';
import '../css/app.css';
import ReactDOM from "react-dom";



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







