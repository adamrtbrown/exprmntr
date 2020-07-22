import Bread from './common/Bread.js';
import GoalRepository from './GoalRepository.js';
import GoalEntity from './GoalEntity.js';
class Goal extends Bread {
    constructor() {
        super();
        this.repository = null;
        this.experimentList = null;
    }

    createNew(goal, success) {
        let entity = new GoalEntity({user: user, goal: goal, success: success});
        entity = this.repo.add(entity);
        return entity;
    }

    editGoal(id, goal, success) {
        let entity = new GoalEntity({id:id, user:user, goal: goal, success: success});
        entity = this.repo.edit(entity);
        return entity;
    }

    readGoal(id) {
        let entity = this.repo.read(id);
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
