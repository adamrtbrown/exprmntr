import Component from "../common/Component.js";
class ExperimentPage extends Component{
    constructor(parent) {
        super(parent);
        this.initNode();
        this.experiment = null;
    }
    
    get html() {
        return `
        <div class="ContentPage">
            <div class="EditExperimentContainer">
                <div class="Instructions">
                    <h1>New Experiment</h1>
                </div>
                <input class="ExperimentTitleEdit TitleEditBox" placeholder="${this.t("EXPERIMENT_TITLE_INPUT")}" />
                <div class="Instructions">
                    <h2>${this.t("HYPOTHESIS_INSTRUCTION_HEADER")}</h2>${this.t("HYPOTHESIS_INSTRUCTION")}
                </div>
                <textarea class="ExperimentHypothesisEdit TextAreaEditBox" placeholder="${this.t("HYPOTHESIS_PLACEHOLDER")}"></textarea>
                <div class="Instructions">
                    <h2>${this.t("METHOD_INSTRUCTION_HEADER")}</h2>${this.t("METHOD_INSTRUCTION")}
                </div>
                <textarea class="ExperimentMethodEdit TextAreaEditBox" placeholder="${this.t("METHOD_PLACEHOLDER")}"></textarea>
                <div class="Instructions">
                    <h2>${this.t("METRIC_INSTRUCTION_HEADER")}</h2>${this.t("METRIC_INSTRUCTION")}
                </div>
                <input class="ExperimentMetricEdit InputEditBox" placeholder="${this.t("METRIC_PLACEHOLDER")}" /><br />
                <div class="Instructions">
                    <button class="Button">Save</button> <span class="Clickable Cancel">${this.t("CANCEL")}</span>
                </div>
            </div>
            <div class="DisplayExperimentContainer">
            </div>
        </div>
        `.trim();
    }

    init() {
        this.node.querySelector(".EditExperimentContainer .Button").addEventListener(
            "click", (evt) => this.saveExperiment()
        )
        this.node.querySelector(".EditExperimentContainer .Cancel").addEventListener(
            "click", (evt) => this.cancelEdit()
        )
    }
    
    async saveExperiment() {
        let editExperiment = {
            goal_id: this.root.goalPage.goal.id,
            title: this.node.querySelector(".ExperimentTitleEdit").value.trim(),
            hypothesis: this.node.querySelector(".ExperimentHypothesisEdit").value.trim(),
            method: this.node.querySelector(".ExperimentMethodEdit").value.trim(),
            metric: this.node.querySelector(".ExperimentMetricEdit").value.trim(),
        }
        if(this.experiment !== null) {
            editExperiment.id = this.experiment.id;
        }
        if(this.validateFields()) {
            let config = {
                url: "experiment",
                method: "POST",
                body: JSON.stringify(editExperiment)
            }
            let response = await this.request(config);
        }
    }

    cancelEdit() {
        this.root.page = GOAL_PAGE;
    }

    validateFields(){
        return true;
    }
}
export default ExperimentPage