const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  train: {
    type: mongoose.Schema.ObjectId,
    ref: 'Train',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Enter the date'],
  },
  seats: {
    type: Number,
    required: [true, 'Enter the available seats'],
    default: 300,
  },
});

module.exports = mongoose.model('Seats', AvailabilitySchema);
