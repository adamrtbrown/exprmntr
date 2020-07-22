import React from 'react';
import GoogleLogin from './GoogleLogin'
import axios from 'axios'
import {ABCIAMAppClient} from 'ABCIAM';
import {ReactComponent as AccountIcon} from '../Icons/Account.svg';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.getAuthToken = this.getAuthToken.bind(this);
    this.state = { id_token: false, loggedIn: false};
    this.clickHandler = this.clickHandler.bind(this);
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
    let response = abc.login(id_token, provider);
    console.log("abciam:", response);
  }

  clickHandler(evt) {
    this.getAuthToken('invalid_token', 'test');
  }

  render() {
    let visual = (<AccountIcon className="MainIcon" />);
    if(!this.state.loggedIn) {
      visual = (
      <div className="AccountContainer">
        Login
        <div class="AccountOptions">
          <GoogleLogin getAuthToken={this.getAuthToken}></GoogleLogin>
        </div>
      </div>
      );
    } 
    return visual;
    
  }
}
export default Login;