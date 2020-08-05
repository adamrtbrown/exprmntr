import React from 'react';
import Language from "./tools/language";
import './FormPage.css';
import {FORMPAGE} from './constants.js'

let L = new Language();

class FormPage extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    let formFields = ["goalField", "successField","completionField","progressField","measureField","metricField"];
    let template = { 
      label: "form_label",
      field: "form_field"
    }
    let styles = {};
    let values = {};
    formFields.forEach(
      function(id){
        styles[id] = template;
        values[id] = "";
      });

    this.state = {
      "styles": styles,
      form_values: values
    }

    let form_values = {
      "goal_text" : "",
      "success_text": "",
      "metric": "",
      "measure" : "",
      "progress_check" : false
    }
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;
    if(id === "progress_check") {
      value = event.target.checked;
    }
    let new_values = this.props.formValues;
    this.props.setFormValues({form_values: new_values});
  }
  
  onFocus(event){
    let id = event.target.id;
    this.changeFocus(id, true)
  }
  onBlur(event) {
    let id = event.target.id;
    this.changeFocus(id, false)
  }
  changeFocus(id, focused){
    let addition = focused ? "_focus" : "";
    let newStyles = this.state.styles;
    newStyles[id] = {
      label: "form_label" + addition,
      field: "form_field" + addition
    }

    this.setState({styles:newStyles})
  }
  changeBlur(event){
    let id = event.target.id;
  }
  render() {
    return(
    <div className="FormPage">
      <div className="content">
          <div className="GoalSection">
            <div>
              <span className="form_section_heading">Goal</span> <br />
              <span className="form_label">What are you attempting to do?</span> <br />
              <textarea 
                className="form_field"
                id="goalField" 
                type="text" 
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                value={this.props.formValues.goalField}
              />
            </div>
            <div>
              <span className="form_label">Success</span> <br />
              <span className="form_description">Describe what's different when the goal is complete.</span> <br />
              <textarea 
                className={this.state.styles.successField.field} 
                id="successField" 
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                type="text" 
                value={this.props.formValues.successField}
              />
            </div>
            <div>
            <span className="form_label">Completion</span> <br />
            <span className="form_description">How much of what defines success?</span> <br />
            {!this.props.formValues.progress_check &&
              <div>
                <input 
                  id="measureField"
                  type="number" 
                  value={this.props.formValues.measureField}  
                  placeholder="200" 
                  className="form_field small"
                />
                <input 
                  id="metricField"
                  type="text" 
                  value={this.props.formValues.metricField} 
                  placeholder="lbs" 
                  className="form_field small"
                />
              </div>
            }
            {this.props.formValues.progress_check &&
              <div>Success towards this goal will be measured by progress in completing experiments.</div>
            }
            <input 
            type="checkbox"
            className="form_field small"
            checked={this.props.formValues.progress_check}
            onChange={this.handleChange}
            id="progress_check"
            /> <span>Just measure progress.</span>
            </div>
          </div>
        
          <div className="ActionSection">
            <div>
              <div>
                <span className="form_section_heading">Experiment!</span>
              </div>
              <div>
                <span className="form_label">What is the next step to achieve your goal?</span><br />
                <input type="text" placeholder="Action title" className="form_field" />
              </div>
              <div>
                <span className="form_label">What will you do?</span><br />
                <textarea placeholder="Describe your method."  className="form_field"></textarea>
              </div>
              <div>
                <span className="form_label">What do you measure?</span><br />
                <input type="text" placeholder="Metric" className="form_field" />
              </div>
              <div>
                <span className="form_label">How often do you measure?</span><br />
                Every <input type="number" placeholder="1"  className="form_field small" /> <select className="form_field small"><option>Hour(s)</option><option selected>Day(s)</option><option>Weeks(s)</option><option>Months(s)</option><option>Year(s)</option></select>
              </div>
              <div>
                <span className="form_label">When does this experiment end?</span><br />
                <input type="date" placeholder="End date.." />
              </div>
              <div>
                <input type="button" value="Done" />
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}
export default FormPage;