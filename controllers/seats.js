const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Seats = require('../models/Availability');
const Train = require('../models/Train');

//@desc    Enter availability for a train
//@route   POST /irctc/v1/:trainId/seats
//@access  Private

exports.enterAvailability = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }
  req.body.train = req.params.trainId;
  const train = await Train.findById(req.params.trainId);

  if (!train) {
    return next(
      new ErrorResponse(`Train not found with id ${req.params.trainId}`, 404)
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

//@desc    Update Availability for a particular slot
//@route   PUT /irctc/v1/seats/:id
//@access  Private

exports.updateAvailability = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }
  let seats = await Seats.findById(req.params.id);

  if (!seats) {
    return next(
      new ErrorResponse(`Seats not found with id ${req.params.id}`),
      404
    );
  }

  seats = await Seats.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: seats,
  });
});

//@desc    Delete Availability for a particular slot
//@route   DELETE /irctc/v1/seats/:id
//@access  Private

exports.deleteAvailability = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('User is not authorized for this route', 401)
    );
  }
  let seats = await Seats.findById(req.params.id);

  if (!seats) {
    return next(
      new ErrorResponse(`Seats not found with id ${req.params.id}`),
      404
    );
  }

  seats.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
