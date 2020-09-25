class GoalEntity {
    constructor(objectData) {
        this.id = objectData.id ?? null;
        this.user = objectData.user ?? null;
        this.goal = objectData.goal ?? null;
        this.success = objectData.success ?? null;
        this.experiments = objectData.experiments ?? [];
    }
}
export default GoalEntity;