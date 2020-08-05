import React from 'react';
import './GoalBig.css';
import Goal from '../../lib/Goal';
import Language from '../../tools/language';
let L = new Language();

class GoalBig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal : {
        id: null,
        goal: "",
        success: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitGoal = this.submitGoal.bind(this);
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

  submitGoal(e) {
    console.log(this.state.goal);
    let goal = new Goal();
    try {
      if(this.id === null) {
        goal.createNew(this.state.goal.goal, this.state.goal.success);
      } else {
        goal.editGoal(this.state.goal.id, this.state.goal.goal, this.state.goal.success)
      }
    } catch (error) {
      alert("There was an error saving the goal.");
    }
  }

  render() {
    let submit_text = "Save";
    let edit = (
      <div className="GoalBigEdit">
        <span className="FieldTitle">Goal</span> <br />
        <input id="title" onChange={this.handleChange} value={this.state.goal.title} /><br />
        <span className="FieldTitle">Success</span> <br />
        <textarea id="description" onChange={this.handleChange} value={this.state.goal.success} ></textarea><br />
        <input type="button" value={submit_text} onClick={this.submitGoal} />
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