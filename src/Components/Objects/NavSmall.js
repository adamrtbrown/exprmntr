import React from 'react';
import './NavSmall.css';
import {ReactComponent as TreeIcon} from '../../Icons/Tree.svg'
import {ReactComponent as DashboardIcon} from '../../Icons/Dashboard.svg'
import {ReactComponent as BackToGoalIcon} from '../../Icons/BackToGoal.svg'
import {FRONTPAGE,DASHBOARDPAGE,GOALPAGE,TREEPAGE,EXPERIMENTPAGE} from '../../constants.js'
import Language from '../../tools/language';

let L = new Language();

class NavSmall extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.setPage(this.props.action);
  }
  
  render(){
    console.log("NavSmall", this.props.action)
    return(
    <div onClick={this.clickHandler} className="NavSmall" title="test">
      {this.props.action === TREEPAGE &&
      <TreeIcon className="Icon" />
      }
      {this.props.action === DASHBOARDPAGE &&
      <DashboardIcon className="Icon" />
      }
      {this.props.action === GOALPAGE &&
      <BackToGoalIcon className="Icon" />
      }
    </div>
    );
  }
}
export default NavSmall;