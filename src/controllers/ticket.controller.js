const ticketService = require('../services/ticket.service');

/**
 * @desc    Create a new support ticket
 * @route   POST /api/tickets
 * @access  Private
 */
const createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;

    if (!subject || !category || !priority) {
      return res.status(400).json({
        success: false,
        message: 'Subject, category and priority are required',
      });
    }

    const ticket = await ticketService.createTicket({
      subject,
      description,
      category,
      priority,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all tickets (with optional filters)
 * @route   GET /api/tickets
 * @access  Private
 */
const getTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getTickets(req.user.id, req.query);

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get ticket statistics for dashboard
 * @route   GET /api/tickets/stats
 * @access  Private
 */
const getTicketStats = async (req, res) => {
  try {
    const stats = await ticketService.getTicketStats(req.user.id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update ticket details
 * @route   PUT /api/tickets/:id
 * @access  Private
 */
const updateTicket = async (req, res) => {
  try {
    const ticket = await ticketService.updateTicket(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update ticket status
 * @route   PATCH /api/tickets/:id/status
 * @access  Private
 */
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await ticketService.updateTicketStatus(
      req.params.id,
      req.user.id,
      status
    );

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a ticket
 * @route   DELETE /api/tickets/:id
 * @access  Private
 */
const deleteTicket = async (req, res) => {
  try {
    await ticketService.deleteTicket(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Ticket deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketStats,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
};
