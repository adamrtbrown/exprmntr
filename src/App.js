import Component from "./lib/common/Component.js";
import Header from "./Components/Header/Header.js";
import ABCIAMClient from "./lib/abciam/ABCIAMClient.js";
class App extends Component{
    constructor() {
        super();
        this.header = new Header();
        this.authObject = null;
        this.initNode();
    }
    
    get html() {
        return `<div></div>`;
    }

    init() {
        this.node.appendChild(this.header.node);
    }
    
    set auth(auth) {
        this.authObject = auth;
        this.header.auth = auth;
    }

}
export default App