import Component from "../common/Component.js";
import ExperimentSmall from '../Components/ExperimentSmall.js';
class GoalPage extends Component {
    constructor(parent) {
        super(parent);

        this.goalData = {
            id: -1,
            title: "",
            success: "",
        };
        this.editModeData = true;
        this.initNode();
    }

    get html() {
        return `
        <div class="ContentPage GoalPage">
            <div class="GoalEditMode">
                <div class="GoalInstructions Instructions"><h1>New Goal</h1>${this.t("MAIN_PAGE_BODY_TEXT")}</div> 
                <div class="GoalTitleDiv"><input class="GoalTitleEdit TitleEditBox" type="text" placeholder="${this.t("GOAL_INPUT_PLACEHOLDER")}" /></div>
                <div class="GoalInstructions Instructions">${this.t("GOAL_SUCCESS_INSTRUCTIONS")}</div>  
                <div class="GoalSuccessDiv"><textarea class="GoalSuccessEdit TextAreaEditBox" placeholder="${this.t("GOAL_SUCCESS_PLACEHOLDER")}"></textarea></div>
                <div class="GoalInstructions Instructions"><button class="Button">Save</button> <span class="Clickable Cancel">${this.t("CANCEL")}</span></div>
            </div>
            <div class="GoalDisplayMode">
                <div class="GoalTitleDisplay"></div>
                <div class="GoalSuccessDisplay"></div>
                <h1>Experiments</h1>
                <div class="AddExperiment">${this.t("CREATE_EXPERIMENT")} ${ADD_ICON}</div>
                <div class="ExperimentContainer">
                    <div class="NoExperiments">${this.t("NO_EXPERIMENT")}</div>
                </div>

            </div>
        </div>
        `.trim();
    }

    init() {
        if(this.app.currentGoal != -1) {
            //this.goal = this.app.goals.find(element => element.id === this.app.currentGoal);
        }
        this.node.querySelector(".GoalInstructions > button").addEventListener(
            "click", () => {this.saveGoal();}
        );
        this.node.querySelector(".Cancel").addEventListener(
            "click", () => {this.cancelEdit();}
        );
        this.node.querySelector(".AddExperiment").addEventListener("click", (evt) => {this.root.page = EXPERIMENT_PAGE});
    }
    
    get editMode() {
        return this.editModeData;
    }

    set editMode(value) {
        this.editModeData = value;
        this.setMode();
    }

    set goal(goal) {
        this.goalData = goal;
        this.node.querySelector(".GoalTitleEdit").value = goal.title;
        this.node.querySelector(".GoalSuccessEdit").value = goal.success;
        this.node.querySelector(".GoalTitleDisplay").innerHTML = goal.title;
        this.node.querySelector(".GoalSuccessDisplay").innerHTML = goal.success;
        this.loadExperiments(true);
    }
    get goal() {
        return this.goalData;
    }

    setMode() {
        if(this.editMode) {
            delete this.node.querySelector(".GoalEditMode").style.display;
            this.node.querySelector(".GoalDisplayMode").style.display = "none";
        } else {
            this.node.querySelector(".GoalEditMode").style.display = "none";
            delete this.node.querySelector(".GoalDisplayMode").style.display
        }
    }
    async saveGoal() {
        if(this.validateForm()) {
            let data = this.getData();
            console.log("Posting data:", data)
            let config = {
                url: "goal",
                method: "POST",
                body: JSON.stringify(data)
            }
            let response = await this.request(config);
        }
    }

    cancelEdit() {
        this.root.page = DASHBOARD_PAGE;
    }

    validateForm(){
        let invalidText = "3px solid yellow";
        let valid = true;
        let titleElement = this.node.querySelector(".GoalTitleEdit");
        let successLIElements = this.node.querySelectorAll(".GoalSuccessDiv > ul > li");
        if(String(titleElement.value).trim() === "") {
            titleElement.style.border = invalidText;
            valid = false;
        }
        
        successLIElements.forEach((element,index) => {
            let text = element.querySelector('input[type="text"]');
            if(!(String(text.value).trim() === "" && String(number.value).trim() === "")) {
                if(String(text.value).trim() === "") {
                    text.style.border = invalidText;
                    valid = false;
                }
            } else {
                if(successLIElements.length === 1) {
                    text.style.border = invalidText;
                    valid = false;
                }
            }
        });
        return valid;
    }

    getData() {
        let data = {
            title: String(this.node.querySelector(".GoalTitleEdit").value).trim(),
            success :String(this.node.querySelector(".GoalSuccessDiv > textarea").value)
        }
        return data;
    }

    async loadExperiments(draw) {
        let config = {
            url: "experiment",
            method: "GET",
            params: {goal: this.goalData.id}
        }
        console.log(config);
        let response = await this.request(config);
        let data = await response.json();
        this.experiments = data.experiments;
        console.log("Experiments:", data.experiments); 
        if(draw) {
            this.drawExperiments();
        }
    }
    drawExperiments() {
        let experimentContainer = this.node.querySelector(".ExperimentContainer");
        this.clearExperimentNodes();
        experimentContainer.querySelector(".NoExperiments").style.display = 
         (this.experiments.length > 0) ? "none" : "flex";
        this.experiments.forEach(experiment => {
            let expNode = new ExperimentSmall(this, {entity: experiment});
            experimentContainer.appendChild(expNode.node);
        });
    }
    clearExperimentNodes() {
        let experimentContainer = this.node.querySelector(".ExperimentContainer");
        let expNodes = experimentContainer.querySelectorAll(".ExperimentSmall");
        expNodes.forEach(node => {experimentContainer.removeChild(node)});
    }
}
export default GoalPage