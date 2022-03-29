const express = require('express');

const {
  createTrain,
  getTrainBetweenStations,
} = require('../controllers/trains');

//Include other resource routers

const scheduleRouter = require('./schedules');
const seatRouter = require('./seats');

const router = express.Router();

//Re-route to other router

router.use('/:trainId/schedule', scheduleRouter);
router.use('/:trainId/seats', seatRouter);

router.route('/').post(createTrain);
router.route('/search').post(getTrainBetweenStations);

module.exports = router;
