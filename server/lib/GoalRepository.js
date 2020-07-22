import Repository from './common/Repository.js';
import GoalEntity from './GoalEntity.js';

class GoalRepository extends Repository {
    constructor() {
        super();
        this.user_id = null;
        this.uid = null;
    }
    browse(filter) {
        filter = {filter: filter};
        return 
    }
    async read(id) {
        try {
            let query = "SELECT goals.id, users.uid, goals.goal, goals.success FROM goals LEFT JOIN users on users.id = goals.user WHERE goals.id = ? LIMIT 1";
            let result = await this.db.query(query, [id]);
            return new GoalEntity(result.results[0]);
        } catch (error) {
            console.error("There was an error reading the Goal", error); 
        }
    }
    async edit(entity) {
        try {
            this.uid = entity.user;
            let query = "REPLACE INTO goals(`id`,`user`,`goal`,`success`) SELECT ?,`id`,?,? FROM users WHERE `uid` = ? LIMIT 1";
            await this.db.query(query,[entity.id,entity.goal,entity.success.entity.user]);
            return entity;
        } catch(error) {
            console.error("There was an error editing the Goal", error);
        }
    }
    async add(entity) {
        try {
            this.uid = entity.user;
            let query = "INSERT INTO goals(`user`, `goal`, `success`) SELECT `id`,?,? FROM users WHERE `uid` = ? LIMIT 1";
            let result = await this.db.query(query,[entity.goal,entity.success,entity.user]);
            entity.id = result.results.insertId;
            return entity;
        } catch(error) {
            console.error("There was an error creating the Goal", error);
        }
    }
    delete(id) {
        let response = this.R.request("DELETE", this.endpoint, id);
        return false;
    }
    
}
export default GoalRepository;