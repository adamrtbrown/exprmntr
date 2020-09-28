import Component from "../common/Component.js";

class GoalPage extends Component {
    constructor(app) {
        super(app);

        this.goal = {
            id: -1,
            title: "",
            success: "",
        };
        this.initNode();
    }

    get html() {
        return `
        <div class="ContentPage GoalPage">
            <div class="GoalInstructions">${this.L.t("MAIN_PAGE_BODY_TEXT")}</div> 
            <div class="GoalTitleDiv"><input class="GoalTitleEdit" type="text" placeholder="${this.L.t("GOAL_INPUT_PLACEHOLDER")}" /></div>
            <div class="GoalInstructions">${this.L.t("GOAL_SUCCESS_INSTRUCTIONS")}</div>  
            <div class="GoalSuccessDiv"><textarea placeholder="${this.L.t("GOAL_SUCCESS_PLACEHOLDER")}"></textarea></div>
            <div class="GoalInstructions"><button class="Button">Save</button></div>
        </div>
        `.trim();
    }

    init() {
        if(this.app.currentGoal != -1) {
            this.goal = this.app.goals.find(element => element.id === this.app.currentGoal);
        }
        this.node.querySelector(".GoalInstructions > button").addEventListener(
            "click", () => {this.saveGoal();}
        );
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
            let response = await this.app.auth.request(config);
        }
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


}
export default GoalPage