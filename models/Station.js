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

StationSchema.virtual('schedule', {
  ref: 'Schedule',
  localField: '_id',
  foreignField: 'station',
  justOne: false,
});

StationSchema.pre('remove', async function (next) {
  console.log(`Schedule gonna be removed for the station ${this.name}`);
  await this.model('Schedule').deleteMany({ station: this._id });
  next();
});

module.exports = mongoose.model('Station', StationSchema);
