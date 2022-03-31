const express = require('express');

const {
  createStation,
  updateStation,
  deleteStation,
} = require('../controllers/stations');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), createStation);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateStation)
  .delete(protect, authorize('admin'), deleteStation);

module.exports = router;
