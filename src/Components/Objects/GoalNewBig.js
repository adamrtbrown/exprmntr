import React from 'react';
import './GoalNewBig.css';
import Language from '../../tools/language';
import {ReactComponent as AddIcon} from '../../Icons/Add.svg'
let L = new Language();

class GoalNewBig extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleClick = (e) => {
    this.props.actionNewGoal();
  }
  render(){
    return(
    <div className="GoalNewBig" onClick={() => this.handleClick()}>
      <div><AddIcon className="AddIcon" /></div>
      <div>Create A New Goal</div>
    </div>
    );
  }
}
export default GoalNewBig;