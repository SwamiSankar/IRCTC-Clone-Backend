const express = require('express');

const {
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/schedules');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSchedule);

router.route('/:stationId').post(protect, authorize('admin'), createSchedule);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateSchedule)
  .delete(protect, authorize('admin'), deleteSchedule);

module.exports = router;
