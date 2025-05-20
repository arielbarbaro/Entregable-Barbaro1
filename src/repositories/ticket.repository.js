const BaseRepository = require('./base.repository');
const ticketDAO = require('../daos/ticket.dao');
const TicketDTO = require('../dtos/ticket.dto');

class TicketRepository extends BaseRepository {
    constructor() {
        super(ticketDAO);
    }

    async createTicket(data) {
        const ticket = await this.dao.createTicket(data);
        return ticket ? TicketDTO.toDTO(ticket) : null;
    }

    async findByPurchaser(email) {
        const tickets = await this.dao.findByPurchaser(email);
        return TicketDTO.toDTOList(tickets);
    }

    async create(ticketData) {
        const ticket = await this.dao.create(ticketData);
        return ticket ? TicketDTO.toDTO(ticket) : null;
    }

    async findAll() {
        const tickets = await this.dao.findAll();
        return TicketDTO.toDTOList(tickets);
    }

    async update(id, ticketData) {
        const ticket = await this.dao.update(id, ticketData);
        return ticket ? TicketDTO.toDTO(ticket) : null;
    }
}

module.exports = new TicketRepository(); 