import React from 'react';
import './GoalSmall.css';
import Language from '../../tools/language';
let L = new Language();

class GoalSmall extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleClick = () => {
    this.props.actionViewGoal(this.props.goal.id);
  }
  render(){
    return(
    <div className="GoalSmall_container">
      <span onClick={() => this.handleClick()} className="GoalSmallTitle">{this.props.goal.title}</span><br />
      <div></div>
    </div>
    );
  }
}
export default GoalSmall;