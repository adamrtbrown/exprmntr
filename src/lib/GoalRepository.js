import Repository from './common/Repository';
import Entity from './GoalEntity';
class GoalRepository extends Repository {
    constructor() {
        super();
        this.requestObject = null;
        this.endpoint = "/goal";
    }
    browse(filter) {
        filter = {filter: filter};
        return this.R.request("GET", this.endpoint, filter);
    }
    read(id) {
        return this.R.request("GET", this.endpoint, {id: id});
    }
    edit(entity, add) {
        let entityData = {
            user : entity.user,
            goal: entity.goal,
            success: entity.success
        }
        if(!add) {
            entityData.id = entity.id;
        }
        try {
            let id = this.R.request("POST", this.endpoint, entityData);
            return id;
        } catch(error) {
            console.error("There was an error creating the Goal". error);
        }
    }
    add(entity) {
        this.edit(entity, true);
    }
    delete(id) {
        let response = this.R.request("DELETE", this.endpoint, id);
        return false;
    }

    
    
}
export default GoalRepository;