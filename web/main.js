import './environment.js';
import App from './App.js';
import ABCIAMClient from './lib/abciam/ABCIAMClient.js';

const A = new ABCIAMClient({url:window.env.API_URL, resource: "token"});
const FRONT_PAGE = 1;
const DASHBOARD_PAGE = 2;
window.addEventListener("DOMContentLoaded", (e) => {
    let app = new App();
    app.auth = A;
    document.body.appendChild(app.node);

    if(window.env.gApp !== undefined) {window.env.gApp = app};
});

//window.addEventListener("keyup",(e)=>{console.log("key", document.activeElement)});