import React from 'react';
//import './DashboardPage.css';
import Language from '../../tools/language';
import GoalSmall from '../Objects/GoalSmall';
import GoalNewBig from '../Objects/GoalNewBig';
import {GOALPAGE} from '../../constants.js'
let L = new Language();

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    let goals = [];
    this.state = {
      goals: goals
    }
    this.actionNewGoal = this.actionNewGoal.bind(this);
    this.actionViewGoal = this.actionViewGoal.bind(this);
  }

  componentDidMount(){
    console.log("mounted getting goals");
    this.setState({goals: this.getGoals()});
  }
  
  getGoals() {
    return [];
    /*
    return [
      {
        id:1,
        title: "Test Goal 1",
        success: "Test Goal 1 will have a total measure of metric.",
        measure: "17",
        metric: "lbs",
        data: [
          [new Date("2020-01-01"),5],
          [new Date("2020-01-07"),10]
        ]
      },
      {
        id:2,
        title: "Test Goal 2",
        success: "Test Goal 2 will have a total measure of metric.",
        measure: "27",
        metric: "Activities",
        data: [
          [new Date("2020-01-01"),20],
          [new Date("2020-01-07"),21]
        ]
      }
    ];
    */
  }
/*
  Requirements:
    - logged In
  Actions:
    - Create a new goal
      * Click New goal icon/big
    - View goal details
      * Click on Goal
    - Switch to tree view
      * click on tree icon
  */
  actionNewGoal() {
    this.props.setPage(GOALPAGE, {pageAction: "edit", goal: null});
  }
  actionViewGoal(goalId){
    this.props.setPage(GOALPAGE, {pageAction: "view", goal: goalId});
  }
  
  render(){
    return(
    <div className="content">
      {(this.props.goals.length === 0) && 
        <GoalNewBig actionNewGoal={this.actionNewGoal} />
      }
      
      {this.props.goals.map((goal, i) => {        
        return (<GoalSmall key={i} actionViewGoal={this.actionViewGoal} goal={goal} />) 
      })}
    </div>
    
    );
  }
}
export default DashboardPage;