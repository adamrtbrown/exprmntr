class Repository {
    constructor() {
        this.client = null;
    }

    browse(filter) {
        return false;
    }
    read(id) {
        return false;
    }
    edit(id, entityData) {
        return false;
    }
    add(entityData) {
        return false;
    }
    delete(id) {
        return false;
    }

    set client(client) {
        this.client = client;
    }

}
export default Repository;