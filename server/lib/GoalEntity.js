class GoalEntity {
    constructor(objectData) {
        this.id = (objectData.id) ? objectData.id : null;
        this.user = (objectData.user) ? objectData.user : null;
        this.title = (objectData.title) ? objectData.title : null;
        this.success = (objectData.success) ? objectData.success : null;
        this.metrics = (objectData.metrics) ? objectData.metrics : [];
    }
}
export default GoalEntity;