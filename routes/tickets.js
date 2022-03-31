const express = require('express');

const {
  createTicket,
  viewTickets,
  viewTicketByPNR,
} = require('../controllers/tickets');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createTicket).get(protect, viewTickets);
router.route('/search').post(viewTicketByPNR);

module.exports = router;
