import React from 'react';
import './GoalField.css'
import NextButton from './NextButton'
import Language from "../tools/language";
let L = new Language();

class GoalField extends React.Component {
  constructor(props){
    super(props);
    this.state = {goal_text: ""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = String(event.target.value).trim();
    this.setState({"goal_text": value});
    if(value !== "") {
      this.props.updateFormValues("goal_text", value);
    }
  }

  render() {
    return( 
    <div className="Field">
      {L.t("GOAL_INPUT_DESCRIPTION")}<br />
      <input type="text" className='GoalField' onChange={this.handleChange} value={this.state.goal_text} placeholder={L.t("GOAL_INPUT_PLACEHOLDER")} />
    </div>
    );
  }
}
export default GoalField;