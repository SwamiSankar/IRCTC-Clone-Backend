const Schedule = require('../models/Schedule');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Train = require('../models/Train');
const Station = require('../models/Station');

//@desc    Create a schedule
//@route   POST /irctc/v1/trains/:trainId/schedule/:stationId
//@access  Private

exports.createSchedule = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }
  req.body.train = req.params.trainId;
  req.body.station = req.params.stationId;

  const train = await Train.findById(req.params.trainId);
  const station = await Station.findById(req.params.stationId);

  if (!train) {
    return next(
      new ErrorResponse(`Train not found with id ${req.params.trainId}`),
      404
    );
  }

  if (!station) {
    return next(
      new ErrorResponse(`Station not found with id ${req.params.stationId}`),
      404
    );
  }

  console.log(JSON.stringify(req.body, null, 2));

  const schedule = await Schedule.create(req.body);

  res.status(201).json({
    success: true,
    data: schedule,
  });
});

//@desc    Get the train schedule
//@route   GET /irctc/v1/trains/:trainId/schedule
//@access  Public

exports.getSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.find({ train: req.params.trainId });

  res.status(200).json({
    success: true,
    data: schedule,
  });
});

//@desc    Update the train schedule
//@route   PUT /irctc/v1/trains/:trainId/schedule/:id
//@access  Private

exports.updateSchedule = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }

  let schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return next(
      new ErrorResponse(`Schedule not found with id ${req.params.id}`),
      404
    );
  }

  schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: schedule,
  });
});

//@desc    Delete the train schedule
//@route   DELETE /irctc/v1/trains/:trainId/schedule/:id
//@access  Private

exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }

  let schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return next(
      new ErrorResponse(`Schedule not found with id ${req.params.id}`),
      404
    );
  }

  schedule.remove();

  req.status(200).json({
    success: true,
    data: {},
  });
});
