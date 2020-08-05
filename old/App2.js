import React from 'react';
import Login from './Auth/Login'
import FrontPage from './Components/Pages/FrontPage';
import DashboardPage from './Components/Pages/DashboardPage';
import GoalPage from './Components/Pages/GoalPage';
import ExperimentPage from './Components/Pages/ExperimentPage';
import TreePage from './Components/Pages/TreePage';
import './vars.css';
import './App.css';
import Language from "./tools/language";
import {FRONTPAGE,DASHBOARDPAGE,GOALPAGE,TREEPAGE,EXPERIMENTPAGE} from './constants.js'
import SubNav from './Components/Objects/SubNav';
import Token from './tools/token';


let L = new Language();
let nav = {
  [FRONTPAGE] : {[TREEPAGE] : false, [GOALPAGE]:false, [DASHBOARDPAGE] : false},
  [DASHBOARDPAGE] : {[TREEPAGE] : true, [GOALPAGE]:false, [DASHBOARDPAGE] : false},
  [GOALPAGE] : {[TREEPAGE] : true, [GOALPAGE]:false, [DASHBOARDPAGE] : true},
  [TREEPAGE] : {[TREEPAGE] : false, [GOALPAGE]:false, [DASHBOARDPAGE] : true},
  [EXPERIMENTPAGE] : {[TREEPAGE] : true, [GOALPAGE]:true, [DASHBOARDPAGE] : true}
}
class App extends React.Component {
  constructor(props){
    super(props);
    let subnav = nav[DASHBOARDPAGE];
    this.state = {
      current_page: DASHBOARDPAGE,
      subnav: subnav,
      goals: [],
      pageOptions: { pageAction : null}
      /*
      form_values: {
        "goal_text" : "",
        "success_text": "",
        "metric": "",
        "measure" : "",
        "progress_check" : false
      }
      */

    }
    this.setPage = this.setPage.bind(this);
    this.setFormValues = this.setFormValues.bind(this);
  }
  setPage(page, options){
    this.setState({current_page: page, subnav: nav[page], pageOptions: options});
  }
  setFormValues(form_values){
    this.setState({"form_values":form_values});
  }
  async getGoals() {
    return [];
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
  }
  async componentDidMount() {
    let goals = await this.getGoals();
    this.setState({goals: goals});
  }
  render() {
    /*
    return(
      <div className="testAppFlex">
        <div className="testIn">1</div>
        <div className="testIn">2</div>
      </div>
    );
    */
    return (
      <div className="App">
        <header>
          <div className="Header">
            <div className="HeaderLeft">
              <div className="LogoHolder">
                <div className="Logo">exprmntr</div>
              </div>
            </div>
            <div className="HeaderRight"><Login L={L} /></div>
          </div>
          <SubNav setPage={this.setPage} actions={this.state.subnav} />
        </header>
        <section>
          {this.state.current_page === FRONTPAGE &&
          <FrontPage />
          }
          {this.state.current_page === DASHBOARDPAGE &&
          <DashboardPage goals={this.state.goals} setPage={this.setPage}/>
          }
          {this.state.current_page === GOALPAGE &&
          <GoalPage pageOptions={this.state.pageOptions}/>
          }
          {this.state.current_page === EXPERIMENTPAGE &&
          <ExperimentPage />
          }
          {this.state.current_page === TREEPAGE &&
          <TreePage />
          }

        </section>
         
      </div>
    );
    
  }
}

export default App;
