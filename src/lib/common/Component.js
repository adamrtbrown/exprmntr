import Language from "../../tools/language.js";
class Component {
    constructor(props) {
        /*
        this.testVariableValue = "";
        this.testVariableNode = null;
        */
        this.L = new Language();
        this.L.setLanguage("en","CA");
        this.node = null;
    }
    /*
    set testVariable(value) {
        this.testVariableNode.nodeValue = value;
    }
    get testVariable() {
        return this.testVariableNode.nodeValue;
    }
    */
    initNode() {
        let frag = document.createRange().createContextualFragment(this.html);
        this.node = frag.firstChild;
        this.init();
    }
    init(){
        console.log("parent init");
    }
    
    get html() {
        return ` `;
    }
    
}
export default Component;