import Component from "../../lib/common/Component.js";
import GoogleLogin from "./GoogleLogin.js";
let AccountIcon = `<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`;

class Account extends Component {
    constructor(app) {
        super(app);
        this.loginText = this.L.t("LOGIN_TEXT");
        
        this.googleLogin = new GoogleLogin(app);
        this.googleLogin.parentComponent = this;

        this.federatedNode = null;
        this.userOptionsNode = null;

        this.authState = {
            auth: false,
            provider: null,
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
        this.node.addEventListener("auth", (e) => {this.updateAuthState();});

        this.setupFederatedOptions();
        this.userOptionsNode = this.node.childNodes[2];
        this.hideOptions();

        this.node.addEventListener("mousedown", (e) => {this.showOptions(e);});
        this.node.addEventListener("focusout", (e) => {console.log("out account"); this.focusOut();});
        this.node.addEventListener("focusin", (e) => {console.log("in account"); this.focusIn();});
        
        this.userOptionsNode.childNodes[1].addEventListener("click", (e)=>{this.logout(e);});
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
    updateAuthState() {
        if(!this.app.auth || !this.googleLogin.ga) {
            return;
        }
        this.hideOptions();
        this.authState.auth = this.app.auth.isLoggedIn;
        if(this.app.auth.provider === "google") {
            let user = this.googleLogin.ga.currentUser.get();
            let profile = user.getBasicProfile();
            let authResponse = user.getAuthResponse();
            this.authState.provider = "google";
            this.authState.id_token = authResponse.id_token;
            this.authState.image_url = profile.getImageUrl();
            this.authState.email = profile.getEmail();
            this.authState.name = profile.getName();
            this.optionsVisible = false;
        }
        let img = document.createElement("img");
        img.className = "Icon";
        img.src = this.authState.image_url;
        AccountIcon = this.node.replaceChild(img, this.node.firstChild);
        img.onerror = () => {this.node.replaceChild(AccountIcon, img);}
        this.app.page = this.app.DASHBOARD_PAGE;
    }

    logout(e) {
        console.log("logout");       
        if(this.authState.provider === "google") {
            this.googleLogin.signOut();
        }
        this.app.auth.logout(true);
        this.authState = {
            auth: false,
            provider: null,
            id_token: null,
            image_url: null,
            email: null,
            name: null,    
        }
        this.node.replaceChild(AccountIcon,this.node.firstChild);
        this.app.page = this.app.FRONT_PAGE;
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
        if(this.authState.auth) {
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