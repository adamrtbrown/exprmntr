import React from 'react';
//import './InputField.css'

class GoalField extends React.Component {
  constructor(props){
    super(props);
    /*props
    Label name (translation)
    Instructions
    Id
    type: text,date,number, select,textarea
    options
    focused
    */
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
      <span className="">{L.t("GOAL_INPUT_DESCRIPTION")}</span><br />
      <input type="text" className='GoalField' onChange={this.handleChange} value={this.state.goal_text} placeholder={L.t("GOAL_INPUT_PLACEHOLDER")} />
    </div>
    );
  }
}
export default GoalField;