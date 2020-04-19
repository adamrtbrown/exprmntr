import React from 'react';
import './NextButton.css'
import Language from "../tools/language";
let L = new Language();

class NextButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {goal_text: ""};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.props.handleNext();
  }

  render() {
    return( 
    <div className="NextButton">
      <input type="button" value={L.t("NEXT")} onClick={this.handleClick} />
    </div>
    );
  }
}
export default NextButton;