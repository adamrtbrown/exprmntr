import Bread from './common/Bread.js';
import ExperimentRepository from './ExperimentRepository.js';
import ExperimentEntity from './ExperimentEntity.js';
class Experiment extends Bread {
    constructor() {
        super();
        this.repository = null;
        this.experimentList = null;
        this.metricList = null;
    }

    async create(user, goal, title, hypothesis, method, metric) {
        let entity = new ExperimentEntity({user: user, goal: goal, title: title, hypothesis:hypothesis, method:method, metric:metric});
        entity = await this.repo.add(entity);
        return entity;
    }

    async edit(id, user, goal, title, hypothesis, method, metric) {
        let entity = new ExperimentEntity({id:id, user: user, goal: goal, title: title, hypothesis:hypothesis, method:method, metric:metric});
        entity = await this.repo.edit(entity);
        return entity;
    }

    read(id) {
        //todo add security
        let entity = this.repo.read(id);
        return entity;
    }

    browse(filter) {
        //todo add security
        console.log("Browse filter:", filter)
        let entityList = this.repo.browse(filter);
        return entityList;
    }

    get repo() {
        if(this.repository === null) {
            this.repository = new ExperimentRepository();
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
export default Experiment;
