import React from 'react';
import './SubNav.css';
import NavSmall from './NavSmall';
import Language from '../../tools/language';
let L = new Language();

class SubNav extends React.Component {
  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    this.props.setPage(page);
  }
  
  render(){
    let navElements = [];
    console.log(this.props.actions)
    for(var i in this.props.actions) {
      console.log("Action",i)
      if(this.props.actions[i]) {
        navElements.push(<NavSmall key={i} action={i} setPage={this.setPage} />);
      }
    }
    return(
    <div className="SubNav">
      {navElements}
    </div>
    );
  }
}
export default SubNav;