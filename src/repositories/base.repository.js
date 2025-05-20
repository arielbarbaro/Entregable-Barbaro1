class BaseRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async create(data) {
        return await this.dao.create(data);
    }

    async findById(id) {
        return await this.dao.findById(id);
    }

    async findAll() {
        return await this.dao.findAll();
    }

    async update(id, data) {
        return await this.dao.update(id, data);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}

module.exports = BaseRepository; 