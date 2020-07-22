class GoalEntity {
    constructor(objectData) {
        this.id = (objectData.id) ? objectData.id : null;
        this.user = (objectData.user) ? objectData.user : null;
        this.goal = (objectData.goal) ? objectData.goal : null;
        this.success = (objectData.success) ? objectData.success : null;
        this.experiments = (objectData.experiments) ? objectData.experiments : [];
    }
}
export default GoalEntity;