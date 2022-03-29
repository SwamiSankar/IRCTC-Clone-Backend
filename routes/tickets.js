const express = require('express');

const { createTicket } = require('../controllers/tickets');

const router = express.Router();

router.route('/').post(createTicket);

module.exports = router;
