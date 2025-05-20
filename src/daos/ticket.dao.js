const BaseDAO = require('./base.dao');
const Ticket = require('../models/ticket.model');

class TicketDAO extends BaseDAO {
    constructor() {
        super(Ticket);
    }

    async createTicket(data) {
        try {
            const ticket = await this.model.create({
                ...data,
                code: this.generateUniqueCode(),
                purchase_datetime: new Date()
            });
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    generateUniqueCode() {
        return `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    async findByPurchaser(email) {
        try {
            const tickets = await this.model.find({ purchaser: email });
            return tickets;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TicketDAO(); 