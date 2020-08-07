import Component from "../../lib/common/Component.js";

class GoalPage extends Component {
    constructor(app) {
        super(app);

        this.goal = {
            id: -1,
            title: "",
            success: "",
            metrics: []
        };
        this.metricElement = null;
        this.initNode();
    }

    get html() {
        return `
        <div class="ContentPage GoalPage">
            <div class="GoalInstructions">${this.L.t("MAIN_PAGE_BODY_TEXT")}</div> 
            <div class="GoalTitleDiv"><input class="GoalTitleEdit" type="text" placeholder="${this.L.t("GOAL_INPUT_PLACEHOLDER")}" /></div>
            <div class="GoalInstructions">${this.L.t("GOAL_SUCCESS_INSTRUCTIONS")}</div> 
            <div class="GoalSuccessDiv"><textarea class="GoalSuccessEdit" type="text" placeholder="${this.L.t("GOAL_SUCCESS_PLACEHOLDER")}" /></textarea></div>
            <div class="GoalInstructions">${this.L.t("GOAL_METRIC_INSTRUCTIONS")}</div> 
            <div class="GoalMetricsDiv"><ul><li>Metric: <input type="text" /> Total: <input type="number" min="0"/></li></ul></div>
            <div class="GoalInstructions"><button class="Button">Save</button></div>
        </div>
        `.trim();
    }

    init() {
        if(this.app.currentGoal != -1) {
            this.goal = this.app.goals.find(element => element.id === this.app.currentGoal);
        }
        let li = this.node.querySelector(".GoalMetricsDiv > ul > li");
        this.metricElement = li.cloneNode(true); 
        li.querySelector("input[type=text]").addEventListener("focusout", (e)=>{this.metricUpdate()});
        li.querySelector("input[type=number]").addEventListener("focusout", (e)=>{this.metricUpdate()});
        this.node.querySelector(".GoalInstructions > button").addEventListener(
            "click", () => {this.saveGoal();}
        );
    }

    metricUpdate() {
        let liElements = this.node.querySelectorAll(".GoalMetricsDiv > ul > li");
        let parent = "";
        liElements.forEach((element) => {
            let metricValue = String(element.querySelector('input[type="text"]').value).trim();
            let metricTotal = element.querySelector('input[type="number"]').value;
            if(isNaN(metricTotal)) {
                element.querySelector('input[type="number"]').value = "";
                metricTotal = "";
            }
            parent = element.parentNode;
            if(metricValue === "" && metricTotal === "") {
                parent.removeChild(element);
            }
        });
        let liNode= this.metricElement.cloneNode(true);
        liNode.querySelector('input[type="text"]').addEventListener("focusout", (e)=>{this.metricUpdate()});
        liNode.querySelector('input[type="number"]').addEventListener("focusout", (e)=>{this.metricUpdate()});
        parent.appendChild(liNode);
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
            console.log(response);
        }
    }

    validateForm(){
        let invalidText = "3px solid yellow";
        let valid = true;
        let titleElement = this.node.querySelector(".GoalTitleEdit");
        let successElement = this.node.querySelector(".GoalSuccessEdit");
        let metricLIElements = this.node.querySelectorAll(".GoalMetricsDiv > ul > li");
        if(String(titleElement.value).trim() === "") {
            titleElement.style.border = invalidText;
            valid = false;
        }
        if(String(successElement.value).trim() === "") {
            successElement.style.border = invalidText;
            valid = false;
        }
        let oneValidMetric = true;
        metricLIElements.forEach((element,index) => {
            let text = element.querySelector('input[type="text"]');
            let number = element.querySelector('input[type="number"]');
            if(!(String(text.value).trim() === "" && String(number.value).trim() === "")) {
                if(String(text.value).trim() === "") {
                    text.style.border = invalidText;
                    valid = false;
                }
                if(String(number.value).trim() === "") {
                    number.style.border = invalidText;
                    valid = false;
                }
            } else {
                if(metricLIElements.length === 1) {
                    text.style.border = invalidText;
                    number.style.border = invalidText;
                    valid = false;
                }
            }
        });
        return valid;
    }

    getData() {
        let data = {
            title: String(this.node.querySelector(".GoalTitleEdit").value).trim(),
            success: String(this.node.querySelector(".GoalSuccessEdit").value).trim(),
            metrics :[]
        }
        let metricLIElements = this.node.querySelectorAll(".GoalMetricsDiv > ul > li");
        metricLIElements.forEach((element,index) => {
            let metricValue = String(element.querySelector('input[type="text"]').value).trim();
            let totalValue = Number(element.querySelector('input[type="number"]').value);
            if(metricValue !== "" && totalValue != "") {
                data.metrics.push({
                    metric: metricValue,
                    value:totalValue
                });
            }
        });
        return data;
    }


}
export default GoalPage