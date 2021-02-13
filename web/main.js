import './environment.js';
import './constants.js'
import App from "./lib/common/App.js";
import ExprmntrApp from './ExprmntrApp.js';
import ABCIAMClient from './lib/abciam/ABCIAMClient.js';
import Language from './tools/language.js';

window.addEventListener("DOMContentLoaded", (e) => {
    
    let config = {
        auth : new ABCIAMClient({url: window.env.API_URL}),
        language: new Language("en", "CA"),
    }
    let root = new ExprmntrApp(null, {app: new App(config)});
    document.body.appendChild(root.node);

    if(window.env.gApp !== undefined) {window.env.gApp = root};
});

//window.addEventListener("keyup",(e)=>{console.log("key", document.activeElement)});