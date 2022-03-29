const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Seats = require('../models/Availability');
const Train = require('../models/Train');

//@desc    Enter availability for a train
//@route   POST /irctc/v1/:trainId/seats
//@access  Private

exports.enterAvailability = asyncHandler(async (req, res, next) => {
  req.body.train = req.params.trainId;
  const train = await Train.findById(req.params.trainId);

  if (!train) {
    return next(
      new ErrorResponse(`Train not found with id ${req.params.trainId}`),
      404
    );
  }

  const availability = await Seats.create(req.body);

  res.status(201).json({
    success: true,
    data: availability,
  });
});

//@desc    Find availability for a train
//@route   GET /irctc/v1/:trainId/seats
//@access  Public

exports.getAvailability = asyncHandler(async (req, res, next) => {
  const availability = await Seats.find({ train: req.params.trainId });
  res.status(200).json({
    success: true,
    data: availability,
  });
});

//@desc Find Availability for a train on a date
//@route POST /irctc/v1/seats/search
//@access Public

exports.findAvailability = asyncHandler(async (req, res, next) => {
  const availability = await Seats.findOne({
    train: req.body.train,
    date: req.body.date,
  });

  res.status(200).json({
    success: true,
    data: availability,
  });
});
