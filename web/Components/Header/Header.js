import Component from "../../lib/common/Component.js";
import Account from "./Account.js";

class Header extends Component {
    constructor(app) {
        super(app);
        this.account = new Account(app);
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