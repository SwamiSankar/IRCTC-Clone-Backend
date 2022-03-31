const Station = require('../models/Station');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc    Create a station
//@route   POST /irctc/v1/station
//@access  Private

exports.createStation = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }
  const station = await Station.create(req.body);

  res.status(201).json({
    success: true,
    data: station,
  });
});

//@desc    Update Station details
//@route   PUT /irctc/v1/station/:id
//@access  Private

exports.updateStation = asyncHandler(async (req, res, next) => {
  let station = await Station.findById(req.params.id);

  if (!station) {
    return next(
      new ErrorResponse(`No Station found for the id ${req.params.id}`, 404)
    );
  }

  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }

  station = await Station.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  req.status(200).json({
    success: true,
    data: station,
  });
});

//@desc    Remove Station
//@route   DELETE /irctc/v1/station/:id
//@access  Private

exports.deleteStation = asyncHandler(async (req, res, next) => {
  let station = await Station.findById(req.params.id);

  if (!station) {
    return next(
      new ErrorResponse(`No Station found for the id ${req.params.id}`, 404)
    );
  }

  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }

  station.remove();

  req.status(200).json({
    success: true,
    data: {},
  });
});
