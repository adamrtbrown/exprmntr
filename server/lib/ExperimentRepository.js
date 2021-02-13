import Repository from './common/Repository.js';
import ExperimentEntity from './ExperimentEntity.js';

class ExperimentRepository extends Repository {
    constructor() {
        super();
        this.user_id = null;
        this.uid = null;
    }
    async browse(filter) {
        let entityList = [];
        if(filter.user) {
            let query = "SELECT experiments.id, users.uid, experiments.goal, experiments.title, experiments.hypothesis, experiments.method, experiments.metric FROM experiments LEFT JOIN users on users.id = experiments.user WHERE users.uid = ? AND experiments.goal = ?";
            let result = await this.db.query(query, [filter.user, filter.goal]);
            result.results.forEach((item) => {entityList.push(new ExperimentEntity({id: item.id, user: item.uid, goal: item.goal, title: item.title, hypothesis: item.hypothesis, method: item.method, metric: item.metric}));});
        }
        return entityList;
    }
    async read(id) {
        try {
            let query = "SELECT experiments.id, users.uid as user, experiments.goal, experiments.title, experiments.hypothesis, experiments.method, experiments.metric FROM experiments LEFT JOIN users on users.id = experiments.user WHERE experiments.id = ? LIMIT 1";
            let result = await this.db.query(query, [id]);
            return new ExperimentEntity(result.results[0]);
        } catch (error) {
            console.error("There was an error reading the Goal", error); 
        }
    }
    async edit(entity) {
        try {
            entity.user = await this.retrieveUserId(entity.user);
            let query = "REPLACE INTO `experiments` SET ?";
            await this.db.query(query, entity);
            return entity;
        } catch(error) {
            console.error("There was an error editing the experiment", error);
        }
    }
    async add(entity) {
        try {
            console.log("entity", entity)
            entity.user = await this.retrieveUserId(entity.user);
            let query = "INSERT INTO `experiments` SET ?";
            let result = await this.db.query(query, entity);
            entity.id = result.results.insertId;
            return entity;
        } catch(error) {
            console.error("There was an error creating the experiment", error);
        }
    }
    delete(id) {
        return false;
    }

    async retrieveUserId(uid) {
        console.log("uid",uid);
        try {
            let query = "SELECT id FROM users WHERE uid = ? LIMIT 1";
            let result = await this.db.query(query, [uid]);
            if (result.results.length === 0) {
                throw new Error("User not found.");
            }
            return result.results[0].id;
        } catch(err) {
            err.message = [this.constructor.name, "retrieveUserId\n", err.message].join();
            throw err;
        }
    }
    
}
export default ExperimentRepository;