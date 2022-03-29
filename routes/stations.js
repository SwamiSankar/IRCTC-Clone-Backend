const express = require('express');

const { createStation } = require('../controllers/stations');

const router = express.Router();

router.route('/').post(createStation);

module.exports = router;
