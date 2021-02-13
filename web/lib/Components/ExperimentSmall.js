import Component from '../common/Component.js'

class ExperimentSmall extends Component {
    constructor(parent, config) {
        super(parent, config);
        this.experimentEntity = config.entity;
        this.initNode();
    }
    init() {

    }

    get html() {
        return `
            <div class="ExperimentSmall">
                <div class="ExperimentGraph">
                </div>
                <div class="SmallTitle">${this.experimentEntity.title}
                </div>
            </div>
        `.trim();
    }
}
export default ExperimentSmall;