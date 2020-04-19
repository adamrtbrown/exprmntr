import React from 'react';
//import './FrontPage.css';
import GoalForm from './Forms/GoalForm'
import Language from './tools/language';
let L = new Language();

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
    <div className="content">
      <div className="f1">
        <div className="initial_goal">
          <GoalForm changePage={this.props.changePage} setFormValues={this.props.setFormValues} />
        </div>
      </div>
      <div className="content_div">
        <div className="scrolly_text">
          <span className="body_header">{L.t("MAIN_PAGE_BODY_TITLE")}</span><br />
          {L.t("MAIN_PAGE_BODY_TEXT")}
        </div>
      </div>
      <div className="f2"></div>
      <div className="content_div">
        <div className="scrolly_text">{L.t("LORUM_IPSUM")}</div>
      </div>
    </div>
    );
  }
}
export default FrontPage;