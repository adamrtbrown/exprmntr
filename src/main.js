import './environment.js';
import App from './App.js';
import ABCIAMClient from './lib/abciam/ABCIAMClient.js';

const A = new ABCIAMClient({url:window.env.API_URL, resource: "token"});

window.addEventListener("DOMContentLoaded", (e) => {
    let app = new App();
    app.auth = A;
    document.body.appendChild(app.node);

    if(window.env.gApp !== undefined) {window.env.gApp = app};
});