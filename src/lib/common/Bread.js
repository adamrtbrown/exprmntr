
class Bread {
    construct() {
        this.repository = null;
    }
    browse(filter) {
        return this.repo.browse(filter)
    }
    read(id) {
        return this.repo.read(id);
    }
    edit(id, entity) {
        return this.repo.edit(id, entity);
    }
    add(entity) {
        return this.repo.add(entity);
    }
    delete(id) {
        return this.repo.delete(id);
    }
    get repo() {
        return this.repository;
    }
    set repo(repository) {
        this.repository = repository;
    }
}
export default Bread;


