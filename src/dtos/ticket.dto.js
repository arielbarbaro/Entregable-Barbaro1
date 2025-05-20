class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.code = ticket.code;
        this.purchase_datetime = ticket.purchase_datetime;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }

    static toDTO(ticket) {
        return new TicketDTO(ticket);
    }

    static toDTOList(tickets) {
        return tickets.map(ticket => new TicketDTO(ticket));
    }
}

module.exports = TicketDTO; 