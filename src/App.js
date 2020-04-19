import React from 'react';
import Login from './Auth/Login'
import FrontPage from './FrontPage';
import './vars.css';
import './App.css';
import Language from "./tools/language";
import {FORMPAGE, FRONTPAGE} from './constants.js'
import FormPage from './FormPage';

let L = new Language();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page_state: FORMPAGE,
      form_values: {
        "goal_text" : "",
        "success_text": "",
        "metric": "",
        "measure" : "",
        "progress_check" : false
      }
    }
    this.changePage = this.changePage.bind(this);
    this.setFormValues = this.setFormValues.bind(this);
  }
  changePage(page){
    this.setState({page_state: page});
  }
  setFormValues(form_values){
    this.setState({"form_values":form_values});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo">exprmntr</div>
          <div className="account"><Login /></div>
        </header>
        {this.state.page_state === FRONTPAGE &&
          <FrontPage changePage={this.changePage} setFormValues={this.setFormValues} />
        } 
        { this.state.page_state === FORMPAGE &&
          <FormPage formValues={this.state.form_values} setFormValues={this.setFormValues} />
        } 
      </div>
    );
  }
}

export default App;
