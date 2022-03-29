const express = require('express');

const {
  enterAvailability,
  getAvailability,
  findAvailability,
} = require('../controllers/seats');

const router = express.Router({ mergeParams: true });

router.route('/').post(enterAvailability).get(getAvailability);

router.route('/search').post(findAvailability);

module.exports = router;
