import Component from "../../lib/common/Component.js";
const ADD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>`;
class DashboardPage extends Component{
    constructor(app) {
        super(app);
        this.goalArray = [];
        this.dashGoalContainerNode = null;
        this.initNode();
    }
    
    get html() {
        return `<div class="ContentPage DashboardPage"><div class="AddGoal">${this.L.t("CREATE_GOAL")} ${ADD_ICON}</div><div class="DashGoalContainer"><div class="NoGoal">${this.L.t("NO_GOALS")}</div></div></div>`;
    }

    init() {
        this.node.querySelector(".AddGoal").addEventListener("click",() => {this.app.page = this.app.GOAL_PAGE;});
        this.dashGoalContainerNode = this.node.querySelector(".DashGoalContainer");
        this.addGoals();
    }
    
    set goals(goals) {
        this.goalArray = goals;
        this.addGoals();
    }
    get goals() {
        return this.goalArray;
    }

    addGoals() {
        if(this.goalArray.length === 0) {
            this.dashGoalContainerNode.querySelector(".NoGoal").style.display = "flex";
        } else {
            this.dashGoalContainerNode.querySelector(".NoGoal").style.display = null;

        }
    }
}
export default DashboardPage