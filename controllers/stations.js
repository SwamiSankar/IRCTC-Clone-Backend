const Station = require('../models/Station');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc    Create a station
//@route   POST /irctc/v1/station
//@access  Private

exports.createStation = asyncHandler(async (req, res, next) => {
  const station = await Station.create(req.body);

  res.status(201).json({
    success: true,
    data: station,
  });
});
