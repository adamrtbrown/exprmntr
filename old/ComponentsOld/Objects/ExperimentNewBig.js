import React from 'react';
//import './GoalNewBig.css';
import Language from '../../tools/language';
let L = new Language();

class ExperimentNewBig extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleClick = (e) => {
    console.log("create a goal");
  }
  render(){
    return(
    <div onClick={() => this.handleClick()}>
      Create A New Experiment
    </div>
    );
  }
}
export default ExperimentNewBig;