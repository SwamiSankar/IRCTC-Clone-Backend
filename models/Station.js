const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter station name'],
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Please enter station code'],
    maxlength: [4, 'Station code cannot be more than 4 characters'],
    unique: true,
  },
});

module.exports = mongoose.model('Station', StationSchema);
