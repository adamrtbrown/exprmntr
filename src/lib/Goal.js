import Bread from './common/Bread';
import GoalRepository from './GoalRepository';
import GoalEntity from './GoalEntity';
class Goal extends Bread {
    constructor() {
        super();
        this.repository = null;
        this.experimentList = null;
    }

    createNew(goal, success) {
        let entity = new GoalEntity({goal: goal, success: success});
        entity = this.repo.add(entity);
        return entity;
    }

    editGoal(id, goal, success) {
        let entity = new GoalEntity({id:id, goal: goal, success: success});
        entity = this.repo.edit(entity);
        return entity;
    }

    get experiments() {
        if(this.experimentList === null) {
            //get experiments
            this.experimentList = [];
        }
        return this.experimentList;
    }


    get repo() {
        if(this.repository === null) {
            this.repository = new GoalRepository();
        }
        return this.repository;
    }

}
export default Goal;
