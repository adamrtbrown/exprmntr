import React from 'react';
import './GoogleLogin.css';
import Language from '../../src/tools/language';

let L = new Language();

class GoogleLogin extends React.Component {

  constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      
  }

  componentDidMount() {
      const ga = window.gapi && window.gapi.auth2 ?
          window.gapi.auth2.getAuthInstance() :
          null;
      if (!ga) this.createScript();
  }

  signIn() {
      const ga = window.gapi.auth2.getAuthInstance();
      ga.signIn().then(
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

  async getABCIAMCredentials(googleUser) {
      const { id_token, expires_at } = googleUser.getAuthResponse();
      const profile = googleUser.getBasicProfile();
      let user = {
          email: profile.getEmail(),
          name: profile.getName()
      };
      console.log(user, id_token, expires_at);
      
      
  }

  createScript() {
      // load the Google SDK
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.onload = this.initGapi;
      document.body.appendChild(script);
  }

  initGapi() {
      // init the Google SDK client
      const g = window.gapi;
      console.log("client_id", process.env.REACT_APP_GOOGLE_APP_ID);
      g.load('auth2', function() {
          g.auth2.init({
              client_id: process.env.REACT_APP_GOOGLE_APP_ID,
              // authorized scopes
              scope: 'profile email openid'
          });
      });
  }

  render() {
      return (
          <div onClick={this.signIn}>
              <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Google Login" />
          </div>
      );
  }
}
export default GoogleLogin;