const express = require('express');

const {
  createStation,
  updateStation,
  deleteStation,
  getStationId,
  getStations,
} = require('../controllers/stations');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('admin'), createStation)
  .get(getStations);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateStation)
  .delete(protect, authorize('admin'), deleteStation);

router.route('/search').post(getStationId);

module.exports = router;
