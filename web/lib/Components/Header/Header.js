import Component from "../../common/Component.js";
import Account from "./Account.js";

class Header extends Component {
    constructor(parent) {
        super(parent);
        this.account = new Account(this);
        this.authObject = null;
        this.initNode();
    }

    get html() {
        return `<header><div class="Logo">exprmntr</div></header>`;
    }

    init() {
        this.node.appendChild(this.account.node);
    }

    set auth(auth) {
        this.authObject = auth;
        this.account.auth = auth;
    }
}
export default Header