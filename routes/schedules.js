const express = require('express');

const { createSchedule, getSchedule } = require('../controllers/schedules');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSchedule);

router.route('/:stationId').post(createSchedule);

module.exports = router;
