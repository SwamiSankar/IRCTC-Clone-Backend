const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  train: {
    type: mongoose.Schema.ObjectId,
    ref: 'Train',
    required: true,
  },
  station: {
    type: mongoose.Schema.ObjectId,
    ref: 'Station',
    required: true,
  },
  day: {
    type: String,
    required: [true, 'Please enter the day'],
  },
  arrivalTime: {
    type: String,
    required: [true, 'Please enter arrival time'],
    match: [
      /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
      'Please enter arrival time in correct format',
    ],
  },
  departureTime: {
    type: String,
    required: [true, 'Please enter departure time'],
    match: [
      /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
      'Please enter departure time in correct format',
    ],
  },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
