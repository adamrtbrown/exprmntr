import React from 'react';
import './GoalForm.css'
import GoalField from './GoalField'
import Language from "../tools/language";
import NextButton from './NextButton'
import {FORMPAGE} from '../constants.js'

let L = new Language();

class GoalForm extends React.Component {
  constructor(props){
    super(props);
    let form_visibility = {
      goal: true,
      success: false,
      metric: false,
      /*
      action:false,
      hypothesis: false,
      method: false,
      metric: false,
      dates: false,
      conclusions:false,
      */
    }
    let form_values = {
      "goal_text" : "",
      "success_text": "",
      "metric": "",
      "measure" : "",
      "progress_check" : false
    }
    this.state = {"form_values": form_values,"form_visibility": form_visibility};
    this.updateFormValues = this.updateFormValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  updateFormValues(field, value) {
    let nv = this.state;
    nv.form_values[field] = value;
    this.setState(nv);
  }

  handleNext() {
    let fs = this.state.form_visibility;
    
    this.props.setFormValues(this.state.form_values);
    if(fs.goal && fs.success && fs.metric) {
      this.props.changePage(FORMPAGE);
    }
    for(let i in fs) {
      if(!fs[i]) {
        fs[i] = true;
        break;
      } 
    }
    this.setState({"form_visibility" : fs});

  }

  handleChange(event) {
    let element = event.target;
    let new_values = this.state.form_values;
    switch(element.id) {
      case "goal_success_input" :
        new_values.success_text = element.value;  
        break;
      case "goal_measure_input":
        new_values.measure = element.value;
        break;
      case "goal_metric_input":
        new_values.metric = element.value;
        break;
      case "goal_progress_check":
        new_values.progress_check = element.checked;
        break;
    }
    this.setState({form_values: new_values});
  }

  render() {
    return(
    <div className="GoalForm">
      {this.state.form_visibility.goal &&
      <GoalField updateFormValues={this.updateFormValues} />
      }
      {!this.state.form_visibility.success && this.state.form_values.goal_text &&
        <NextButton handleNext={this.handleNext} />
      }
      {this.state.form_visibility.success &&
      <div className="Field">
        {L.t("GOAL_SUCCESS_INPUT")}<br />
        <textarea id="goal_success_input" onChange={this.handleChange} value={this.state.form_values.success_text} placeholder={L.t("GOAL_SUCCESS_PLACEHOLDER")} />
      </div>
      }
      {!this.state.form_visibility.metric && this.state.form_values.success_text &&
        <NextButton handleNext={this.handleNext} />
      }
      {this.state.form_visibility.metric &&
      <div className="Field">
        {L.t("GOAL_METRIC_INPUT")}<br />
        <span>{L.t("TOTAL")}</span> <input type="number" id='goal_measure_input' onChange={this.handleChange} placeholder={L.t("ONE_MILLION")} />
        <span>{L.t("METRIC")}</span> <input type="text" id="goal_metric_input" onChange={this.handleChange} placeholder={L.t("DOLLARS")} /><br />
        <input type="checkbox" id="goal_progress_check" onChange={this.handleChange} /> <span>{L.t("MEASURE_PROGRESS")}</span> <br />
      </div>
      }
      {((this.state.form_values.metric !== "" && this.state.form_values.measure) || (this.state.form_values.progress_check)) && 
        <NextButton handleNext={this.handleNext} />
      }
    </div>
    );
  }
}
export default GoalForm;