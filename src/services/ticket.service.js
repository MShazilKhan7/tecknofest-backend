const Ticket = require('../models/ticket.model');

const createTicket = async (data) => {
  return await Ticket.create({
    subject: data.subject,
    description: data.description,
    category: data.category,
    priority: data.priority,
    user: data.userId,
  });
};

const getTickets = async (userId, filters) => {
  const query = { user: userId };

  if (filters.priority) query.priority = filters.priority;
  if (filters.status) query.status = filters.status;

  if (filters.search) {
    query.subject = { $regex: filters.search, $options: 'i' };
  }

  return await Ticket.find(query).sort({ createdAt: -1 });
};

const getTicketStats = async (userId) => {
  const tickets = await Ticket.find({ user: userId });

  return {
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };
};

const updateTicket = async (ticketId, userId, data) => {
  const ticket = await Ticket.findOne({ _id: ticketId, user: userId });
  if (!ticket) throw new Error('Ticket not found');

  Object.assign(ticket, data);
  return await ticket.save();
};

const updateTicketStatus = async (ticketId, userId, status) => {
  if (!['Open', 'In Progress', 'Resolved'].includes(status)) {
    throw new Error('Invalid status');
  }

  const ticket = await Ticket.findOne({ _id: ticketId, user: userId });
  if (!ticket) throw new Error('Ticket not found');

  ticket.status = status;
  return await ticket.save();
};

const deleteTicket = async (ticketId, userId) => {
  const ticket = await Ticket.findOneAndDelete({ _id: ticketId, user: userId });
  if (!ticket) throw new Error('Ticket not found');
};

module.exports = {
  createTicket,
  getTickets,
  getTicketStats,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
};
