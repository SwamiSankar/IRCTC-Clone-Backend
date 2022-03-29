const Train = require('../models/Train');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Schedule = require('../models/Schedule');
const Station = require('../models/Station');
const Seats = require('../models/Availability');

//@desc    Create a train
//@route   POST /irctc/v1/trains
//@access  Private

exports.createTrain = asyncHandler(async (req, res, next) => {
  const train = await Train.create(req.body);
  res.status(201).json({
    success: true,
    data: train,
  });
});

//@desc    Get train between stations
//@route   POST /irctc/v1/trains/search
//@access  Public

exports.getTrainBetweenStations = asyncHandler(async (req, res, next) => {
  let sourceStation = await Station.findOne({ name: req.body.source });
  let destinationStation = await Station.findOne({
    name: req.body.destination,
  });

  let sourceId = sourceStation._id;
  let destinationId = destinationStation._id;

  const sourceSchedule = await Schedule.find({ station: sourceId });
  const destinationSchedule = await Schedule.find({ station: destinationId });

  let sourceTrainArray = sourceSchedule.map((schedule) =>
    schedule.train.valueOf()
  );

  let destinationTrainArray = destinationSchedule.map((schedule) =>
    schedule.train.valueOf()
  );

  let trainArray = sourceTrainArray.filter(function (n) {
    return this.has(n);
  }, new Set(destinationTrainArray));

  let resultArray = await Promise.all(
    trainArray.map(async (train) => Train.findById(train))
  );

  const findAvail = async (trainArray) => {
    console.log(trainArray);
    for (const train in trainArray) {
      trainArray[train].availability = await Seats.findOne({
        train: trainArray[train].id,
        date: req.body.date,
      });
    }
    return trainArray;
  };

  resultArray = await findAvail(resultArray);

  console.log(resultArray);

  res.status(200).json({
    success: true,
    data: resultArray,
  });
});
