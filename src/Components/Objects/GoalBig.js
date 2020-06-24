import React from 'react';
import './GoalBig.css';

import Language from '../../tools/language';
let L = new Language();

class GoalBig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal : {
        id: null,
        title: "",
        description: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    let value = e.target.value;
    let id = e.target.id;
    let goal = {
      id : this.state.goal.id,
      title: id === "title" ? value : this.state.goal.title,
      success: id === "description" ? value : this.state.goal.success,
    }
    this.setState({goal: goal});
  }


  render() {
    let submit_text = "Save";
    let edit = (
      <div className="GoalBigEdit">
        <span className="FieldTitle">Goal</span> <br />
        <input id="title" onChange={this.handleChange} value={this.state.goal.title} /><br />
        <span className="FieldTitle">Success</span> <br />
        <textarea id="description" onChange={this.handleChange} value={this.state.goal.success} ></textarea><br />
        <input type="button" value={submit_text} />
      </div>
    );
    let view = (<div>View</div>);
    return(
    <div className="GoalBig">
      {this.props.mode === "edit" ? edit : view}
    </div>
    );
  }
}
export default GoalBig;