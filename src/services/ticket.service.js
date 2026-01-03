const prisma = require('../utils/prisma');

const VALID_STATUSES = ['open', 'in progress', 'resolved'];

const createTicket = async (data) => {
  return await prisma.ticket.create({
    data: {
      subject: data.subject,
      description: data.description || null,
      category: data.category,
      priority: data.priority,
      userId: data.userId,
      status: 'Open',
    },
  });
};

/**
 * Get tickets with filters + search
 */
const getTickets = async (userId, filters = {}) => {
  const where = {
    userId,
  };

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.search) {
    where.subject = {
      contains: filters.search,
      mode: 'insensitive',
    };
  }

  return await prisma.ticket.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

/**
 * Ticket dashboard stats
 */
const getTicketStats = async (userId) => {
  const [open, inProgress, resolved] = await Promise.all([
    prisma.ticket.count({ where: { userId, status: 'Open' } }),
    prisma.ticket.count({ where: { userId, status: 'In Progress' } }),
    prisma.ticket.count({ where: { userId, status: 'Resolved' } }),
  ]);

  return { open, inProgress, resolved };
};

/**
 * Update full ticket
 */
const updateTicket = async (ticketId, userId, data) => {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId, userId },
  });

  if (!ticket) throw new Error('Ticket not found');

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      subject: data.subject ?? ticket.subject,
      description: data.description ?? ticket.description,
      category: data.category ?? ticket.category,
      priority: data.priority ?? ticket.priority,
      status: data.status ?? ticket.status,
    },
  });
};

/**
 * Update ticket status only
 */
const updateTicketStatus = async (ticketId, userId, status) => {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid status');
  }

  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId, userId },
  });

  if (!ticket) throw new Error('Ticket not found');

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
  });
};

/**
 * Delete ticket
 */
const deleteTicket = async (ticketId, userId) => {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId, userId },
  });

  if (!ticket) throw new Error('Ticket not found');

  await prisma.ticket.delete({
    where: { id: ticketId },
  });
};

module.exports = {
  createTicket,
  getTickets,
  getTicketStats,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
};
