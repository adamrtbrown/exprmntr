import Component from "../../lib/common/Component.js";
class GoogleLogin extends Component{
    constructor(app) {
        super(app);
        this.googleAltText = this.L.t("GOOGLE_LOGIN");
        this.parentComponent = null;
        this.gauth = null;
        this.initNode();
    }
    
    init() {
        this.initGoogle();
        this.node.addEventListener("click", (e) => {this.signIn();});
    }
    get html() {
        return `

        <div class="LoginButton" tabindex="0">
            <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="${this.googleAltText}" />
        </div>

        `.trim();
    }

    set ga(gauth) {
        this.gauth = gauth;
    }
    get ga() {
        return this.gauth;
    }

    signIn() {
        this.ga = window.gapi.auth2.getAuthInstance();
        this.ga.signIn().then(
            googleUser => {
                this.getABCIAMCredentials(googleUser);
            },
            error => {
                console.log(error);
            }
        ).catch(function(err) {
            console.log("Exception", err);
        });
    }

    signOut() {
        this.ga.signOut();
    }
    async getABCIAMCredentials(googleUser) {
        const { id_token, expires_at } = googleUser.getAuthResponse();
        const profile = googleUser.getBasicProfile();
        let user = {
            email: profile.getEmail(),
            name: profile.getName()
        };
        await this.app.auth.login(id_token, 'google');
        this.node.dispatchEvent(new CustomEvent("auth",{bubbles:true}));
    }

    initGoogle() {
        const ga = window.gapi && window.gapi.auth2 ?
          window.gapi.auth2.getAuthInstance() :
          null;
        if (!ga) {
            this.createScript();
        }
    }

    createScript() {
        // load the Google SDK
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        
        script.addEventListener("load",() => {this.initGapi()});
        document.body.appendChild(script);
    }
  
    initGapi() {
        // init the Google SDK client
        const g = window.gapi;
        g.load('auth2', () => {
            g.auth2.init({
                client_id: window.env.GOOGLE_APP_ID,
                // authorized scopes
                scope: 'profile email openid'
            });
            let gauth = g.auth2.getAuthInstance()
            gauth.then(
                () => {
                    this.ga = gauth;
                    if(gauth.isSignedIn.get()) {
                        if(this.app.auth.isLoggedIn) {
                            let e = new CustomEvent("auth", {bubbles:true});
                            this.node.dispatchEvent(e);
                        } else {
                            this.getABCIAMCredentials(gauth.currentUser.get());
                        }
                    }
                }
            );
            
        });
    }
 } 
export default GoogleLogin;