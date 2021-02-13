import Bread from './common/Bread.js';
import GoalRepository from './GoalRepository.js';
import GoalEntity from './GoalEntity.js';
class Goal extends Bread {
    constructor() {
        super();
        this.repository = null;
        this.experimentList = null;
        this.metricList = null;
    }

    async createNew(user, title, success, metrics) {
        let entity = new GoalEntity({user: user, title: title, success: success});
        entity = await this.repo.add(entity);
        return entity;
    }

    editGoal(id, user, title, success, metrics) {
        let entity = new GoalEntity({id:id, user:user, title: title, success: success, metrics: metrics});
        entity = this.repo.edit(entity);
        return entity;
    }

    readGoal(id) {
        //todo add security
        let entity = this.repo.read(id);
        return entity;
    }

    browseGoal(filter) {
        //todo add security
        console.log("Browse filter:", filter)
        let entityList = this.repo.browse(filter);
        return entityList;
    }

    get experiments() {
        if(this.experimentList === null) {
            //get experiments
            this.experimentList = [];
        }
        return this.experimentList;
    }
    get metrics() {
        if(this.metrics === null) {
            //get experiments
            this.metrics = [];
        }
        return this.metrics;
    }

    get repo() {
        if(this.repository === null) {
            this.repository = new GoalRepository();
        }
        return this.repository;
    }

    set client(client) {
        this.repo.client = client;
    }

    end() {
        this.repo.db.end();
    }

}
export default Goal;
