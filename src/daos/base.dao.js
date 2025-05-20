class BaseDAO {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const newItem = await this.model.create(data);
            return newItem;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const item = await this.model.findById(id);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const items = await this.model.find();
            return items;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(id, data, { new: true });
            return updatedItem;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedItem = await this.model.findByIdAndDelete(id);
            return deletedItem;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BaseDAO; 