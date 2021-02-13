class ExperimentEntity {
    constructor(objectData) {
        this.id = (objectData.id) ? objectData.id : null;
        this.user = (objectData.user) ? objectData.user : null;
        this.goal = (objectData.goal) ? objectData.goal : null;
        this.title = (objectData.title) ? objectData.title : null;
        this.hypothesis = (objectData.hypothesis) ? objectData.hypothesis : null;
        this.method = (objectData.method) ? objectData.method : null;
        this.metric = (objectData.metric) ? objectData.metric : null;
    }
}
export default ExperimentEntity;