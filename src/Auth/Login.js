import React from 'react';
import GoogleLogin from './GoogleLogin'
import axios from 'axios'

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.getAuthToken = this.getAuthToken.bind(this);
    this.state = { id_token: false };
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  async getAuthToken(id_token, provider) {
    let url = process.env.REACT_APP_LOGIN_URL;
    let response = await axios.post(url,{'id_token' : id_token, 'provider' : provider});
    console.log("abciam:", response);
  }

  clickHandler(evt) {
    this.getAuthToken('invalid_tojken', 'test');
  }

  render() {
    return (
    <div> 
    <GoogleLogin getAuthToken={this.getAuthToken}></GoogleLogin>
    </div>);
  }
}
export default Login;