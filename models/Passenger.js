const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter passenger name'],
    trim: true,
  },
  age: {
    type: String,
    required: [true, 'Please enter age'],
  },
  gender: {
    type: String,
    required: [true, 'Please enter gender'],
    enum: ['male', 'female', 'other'],
  },
  berth: {
    type: String,
    required: [true, 'Please enter berth preference'],
    enum: ['lb', 'mb', 'ub', 'sl', 'su'],
  },
  seatNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Passenger', PassengerSchema);
