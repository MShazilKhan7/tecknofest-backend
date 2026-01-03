const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  createTicket,
  getTickets,
  getTicketStats,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
} = require('../controllers/ticket.controller');

// All ticket routes are protected
router.use(protect);

// Ticket CRUD
router.post('/', createTicket);          // Create ticket
router.get('/', getTickets);              // List tickets (with filters)
router.get('/stats', getTicketStats);     // Dashboard stats
router.put('/:id', updateTicket);         // Edit ticket
router.patch('/:id/status', updateTicketStatus); // Change status
router.delete('/:id', deleteTicket);      // Delete ticket

module.exports = router;
