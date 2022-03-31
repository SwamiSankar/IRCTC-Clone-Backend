const express = require('express');

const {
  createTrain,
  getTrainBetweenStations,
  updateTrain,
  deleteTrain,
} = require('../controllers/trains');

const { protect, authorize } = require('../middleware/auth');

//Include other resource routers

const scheduleRouter = require('./schedules');
const seatRouter = require('./seats');

const router = express.Router();

//Re-route to other router

router.use('/:trainId/schedule', scheduleRouter);
router.use('/:trainId/seats', seatRouter);

router
  .route('/')
  .post(protect, authorize('admin'), createTrain)
  .put(protect, authorize('admin'), updateTrain)
  .delete(protect, authorize('admin'), deleteTrain);
router.route('/search').post(getTrainBetweenStations);

module.exports = router;
