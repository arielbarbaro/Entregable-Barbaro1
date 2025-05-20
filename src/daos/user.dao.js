const BaseDAO = require('./base.dao');
const User = require('../models/user.model');

class UserDAO extends BaseDAO {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndPopulate(id) {
        try {
            const user = await this.model.findById(id).populate('cart');
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserDAO(); 