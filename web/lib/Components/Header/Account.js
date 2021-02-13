import Component from "../../common/Component.js";
import GoogleLogin from "./GoogleLogin.js";
let AccountIcon = `<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`;

class Account extends Component {
    constructor(parent) {
        super(parent);
        this.loginText = this.t("LOGIN_TEXT");
        
        this.googleLogin = new GoogleLogin(this);
        this.googleLogin.parentComponent = this;

        this.federatedNode = null;
        this.userOptionsNode = null;
        this.accountIconNode = null;
        this.imageIconNode = null;

        this.authState = {
            auth: false,
            id_token: null,
            image_url: null,
            email: null,
            name: null,
        };
        this.focused = false;
        this.initNode();
    }
    
    get html() {
        let userOptions = `<div class="Link" tabindex="0">Account</div><div class="Link" tabindex="0">Logout</div>`
        return `<div tabindex="0" class="Account">${AccountIcon}<div class="FederatedOptions"></div><div class="UserOptions">${userOptions}</div></div>`;
    }

    init() {
        this.setupFederatedOptions();
        this.userOptionsNode = this.node.childNodes[2];
        this.hideOptions();
        this.accountIconNode = this.node.firstChild;
        this.imageIconNode = document.createElement("img");
        this.imageIconNode.className = "Icon";
        this.imageIconNode.addEventListener("error", (e) => {
            this.node.replaceChild(this.accountIconNode, this.imageIconNode);
        });
        this.node.addEventListener("mousedown", (e) => {this.showOptions(e);});
        this.node.addEventListener("focusout", (e) => { this.focusOut();});
        this.node.addEventListener("focusin", (e) => { this.focusIn();});
        
        this.userOptionsNode.childNodes[1].addEventListener("click", (e)=>{this.logout(e);});
        this.updateAuthState();
    }

    focusOut() {
        this.focused = false;
        setTimeout(() => {
            if(!this.focused) {
                this.hideOptions();
            }
        },1);
    }
    focusIn() {
        this.focused = true;
        this.showOptions();
    }
    async updateAuthState() {
        if(!this.app.auth || !this.googleLogin.ga) {
            return;
        }
        if (this.app.auth.isLoggedIn) {
            this.setLoggedInState();
        } else {
            if (this.googleLogin.ga) {
                let googleUser = this.googleLogin.ga.currentUser.get();
                const { id_token, expires_at } = googleUser.getAuthResponse();
                await this.app.auth.login(id_token);
                this.setLoggedInState();
            }
        }
        this.hideOptions();
    }

    setLoggedInState() {
        console.log("setting logged in state");
        this.root.page = DASHBOARD_PAGE;
        if (this.googleLogin.ga) {
            console.log("updateAuthState: we have a google");
            let user = this.googleLogin.ga.currentUser.get();
            let profile = user.getBasicProfile();
            this.imageIconNode.src = profile.getImageUrl();
            this.node.replaceChild(this.imageIconNode, this.node.firstChild);
        }
        this.root.login();
    }
    
    logout(e) {
        console.log("logout");   
        if(this.googleLogin.ga) {
            this.googleLogin.signOut();
        }
        this.node.replaceChild(this.accountIconNode, this.node.firstChild);
        this.root.logout();
        setTimeout(() => {this.hideOptions();}, 1);
    }
    setupFederatedOptions() {
        this.federatedNode = this.node.childNodes[1];
        this.federatedNode.appendChild(this.googleLogin.node);
    }

    showOptions(e) {
        if(this.optionsVisible) {
           return; 
        }
        this.optionsVisible = true;
        if(this.app.auth.isLoggedIn) {
            this.userOptionsNode.style.display = null;
        } else {
            this.federatedNode.style.display = null;
        }
    }

    hideOptions() {        
        
        this.optionsVisible = false;
        this.federatedNode.style.display = "none";
        this.userOptionsNode.style.display = "none";
    }
}
export default Account