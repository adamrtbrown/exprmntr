import Repository from './common/Repository.js';
import GoalEntity from './GoalEntity.js';

class GoalRepository extends Repository {
    constructor() {
        super();
        this.user_id = null;
        this.uid = null;
    }
    async browse(filter) {
        let entityList = [];
        if(filter.user) {
            let query = "SELECT goals.id, users.uid, goals.title, goals.success FROM goals LEFT JOIN users on users.id = goals.user WHERE users.uid = ?";
            let result = await this.db.query(query, [filter.user]);
            result.results.forEach((item) => {entityList.push(new GoalEntity({id: item.id, user: item.uid, title: item.title, success: item.success}));});
        }
        return entityList;
    }
    async read(id) {
        try {
            let query = "SELECT goals.id, users.uid as user, goals.title, goals.success FROM goals LEFT JOIN users on users.id = goals.user WHERE goals.id = ? LIMIT 1";
            let result = await this.db.query(query, [id]);
            return new GoalEntity(result.results[0]);
        } catch (error) {
            console.error("There was an error reading the Goal", error); 
        }
    }
    async edit(entity) {
        try {
            this.uid = entity.user;
            let query = "REPLACE INTO goals(`id`,`user`,`title`,`success`) SELECT ?,`id`,?,? FROM users WHERE `uid` = ? LIMIT 1";
            await this.db.query(query,[entity.id, entity.title, entity.success, entity.user]);
            return entity;
        } catch(error) {
            console.error("There was an error editing the Goal", error);
        }
    }
    async add(entity) {
        try {
            console.log("Adding goal", entity);
            this.uid = entity.user;
            let query = "INSERT INTO `goals`(`user`, `title`, `success`) SELECT `id`,?,? FROM users WHERE `uid` = ? LIMIT 1";
            let result = await this.db.query(query,[entity.title, entity.success, entity.user]);
            entity.id = result.results.insertId;
            console.log("returning entity.id",entity.id);
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