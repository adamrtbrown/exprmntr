import Component from "../common/Component.js";
class DashboardPage extends Component{
    constructor(parent) {
        super(parent);
        this.goalArray = [];
        this.dashGoalContainerNode = null;
        this.initNode();
    }
    
    get html() {
        return `<div class="ContentPage DashboardPage"><div class="AddGoal">${this.t("CREATE_GOAL")} ${ADD_ICON}</div><div class="DashGoalContainer"><div class="NoGoal">${this.t("NO_GOALS")}</div></div></div>`;
    }

    init() {
        this.node.querySelector(".AddGoal").addEventListener("click",() => {this.addGoalAction()});
        this.dashGoalContainerNode = this.node.querySelector(".DashGoalContainer");
    }
    
    set goals(goals) {
        this.goalArray = goals;
        this.app.goals = goals;
        this.displayGoals();
    }
    get goals() {
        return this.goalArray;
    }
    
    addGoalAction() {
        this.root.page = GOAL_PAGE;
        this.root.goalPage.editMode = true;
    }
    async loadGoals(draw) {
        let config = {
            url: "goal",
            method: "GET"
        }
        let response = await this.request(config);
        let data = await response.json();
        this.goals = data.goals;
    }

    displayGoals() {
        this.clearGoalElements();
        if(this.goalArray.length === 0) {
            this.dashGoalContainerNode.querySelector(".NoGoal").style.display = "flex";
        } else {
            this.dashGoalContainerNode.querySelector(".NoGoal").style.display = null;
            this.goals.forEach((goal) => {
                let newDiv = document.createElement("div");
                newDiv.innerHTML = goal.title;
                newDiv.className = "GoalSmall";
                newDiv.addEventListener("click", (evt) => {this.viewGoal(goal)});
                this.dashGoalContainerNode.appendChild(newDiv);
            })
        }
    }
    clearGoalElements() {
        let elements = this.dashGoalContainerNode.querySelectorAll(".GoalSmall");
        for(let i = 0; i < elements.length; i++) {
            this.dashGoalContainerNode.removeChild(elements[i]);
        }
    }
    viewGoal(goal) {

        this.root.goalPage.editMode = false;
        this.root.goalPage.goal = goal;
        this.root.page = ["goal",goal.id].join("/");
    }
}
export default DashboardPage