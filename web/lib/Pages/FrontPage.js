import Component from "../common/Component.js";
class FrontPage extends Component{
    constructor(parent) {
        super(parent);
        this.initNode();
    }
    
    get html() {
        return `<div class="ContentPage">This is the Frontpage of the App</div>`;
    }

    init() {
        
    }
    
}
export default FrontPage