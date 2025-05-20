const BaseRepository = require('./base.repository');
const userDAO = require('../daos/user.dao');
const UserDTO = require('../dtos/user.dto');

class UserRepository extends BaseRepository {
    constructor() {
        super(userDAO);
    }

    async findByEmail(email) {
        const user = await this.dao.findByEmail(email);
        return user ? UserDTO.toDTO(user) : null;
    }

    async findByIdAndPopulate(id) {
        const user = await this.dao.findByIdAndPopulate(id);
        return user ? UserDTO.toDTO(user) : null;
    }

    async create(userData) {
        const user = await this.dao.create(userData);
        return UserDTO.toDTO(user);
    }

    async findAll() {
        const users = await this.dao.findAll();
        return UserDTO.toDTOList(users);
    }

    async update(id, userData) {
        const user = await this.dao.update(id, userData);
        return user ? UserDTO.toDTO(user) : null;
    }
}

module.exports = new UserRepository(); 