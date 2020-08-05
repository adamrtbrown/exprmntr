import React from 'react';
import './Login.css';
import GoogleLogin from './GoogleLogin'
import axios from 'axios'
import {ABCIAMAppClient} from 'ABCIAM';
import {ReactComponent as AccountIcon} from '../Icons/Account.svg';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.getAuthToken = this.getAuthToken.bind(this);
    this.state = {
       id_token: false, 
       loggedIn: false,
       federatedHolderClass : "FederatedOptions NoVisibility"
      };
    this.clickHandler = this.clickHandler.bind(this);
    this.showFederatedOptions = this.showFederatedOptions.bind(this);
    this.hideFederatedOptions = this.hideFederatedOptions.bind(this);
    this._onblur = this._onblur.bind(this);
    this.federatedBaseClass = "FederatedOptions";
    
  }
  
  async getAuthToken(id_token, provider) {
    //let url = process.env.REACT_APP_LOGIN_URL;
    //let response = await axios.post(url,{'id_token' : id_token, 'provider' : provider});
    let config = {
      url: process.env.REACT_APP_API_URL,
      resource: "/token"
    }
    console.log(ABCIAMAppClient);
    let abc = new ABCIAMAppClient(config);
    let response = await abc.login(id_token, provider);
    console.log("abciam:", response);
  }

  clickHandler(evt) {
    this.getAuthToken('invalid_token', 'test');
  }
  
  _onblur() {
    this.hideFederatedOptions();
  }
  showFederatedOptions(e) {
    this.setState({federatedHolderClass : this.federatedBaseClass});
    let federated = document.getElementById("FederatedOptions");
    setTimeout(() => {federated.focus()}, 1); 
  }

  hideFederatedOptions(e) {
    this.setState({federatedHolderClass : this.federatedBaseClass + " NoVisibility"});
    console.log("hiding");
  }
  render() {
    let visual = (<AccountIcon className="MainIcon" />);
    if(!this.state.loggedIn) {
      visual = (
      <div  className="Login" >
        <a tabindex onMouseDown={this._onmousedownfocus} onClick={this.showFederatedOptions} className="Login-link">Login</a>
        <div tabindex="1" id="FederatedOptions" onFocus={this._onfocus} className={this.state.federatedHolderClass} onBlur={this._onblur}>
          <GoogleLogin getAuthToken={this.getAuthToken}></GoogleLogin>
        </div>
      </div>
      );
    } 
    return visual;
    
  }
}
export default Login;