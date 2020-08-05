import React from 'react';
//import './GoalPage.css';
import GoalBig from '../Objects/GoalBig'
import ExperimentNewBig from '../Objects/ExperimentNewBig'
import Language from '../../tools/language';
let L = new Language();

class GoalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      goal: {
        experiments: []
      },
      loading : true
    }
    //this.props.pageOptions
  }
  
  componentDidMount() {
    this.getLatestData();
  }

  getLatestData() {
    let goal = {
      id:1,
      title: "Test Goal 1",
      success: "Test Goal 1 will have a total measure of metric.",
      measure: "17",
      metric: "lbs",
      data: [
        [new Date("2020-01-01"),5],
        [new Date("2020-01-07"),10]
      ],
      //experiments: [],
      experiments: []
    }
    this.setState({goal : goal, loading: false});
  }

  render(){
    let goal = this.state.goal;
    
    let test = (<div>Loading...</div>);
    let test2 = (<GoalBig mode={this.props.pageOptions.pageAction} />);
    
    return(
    <div className="GoalPage">
      {test2}
    </div>
    );
  }
}
export default GoalPage;