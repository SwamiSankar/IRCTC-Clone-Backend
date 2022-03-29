const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the train name'],
      unique: true,
      maxlength: [50, 'Train name should not be more than 50 characters'],
    },
    number: {
      type: String,
      required: [true, 'Please enter the train number'],
      match: [
        /^[012]\d{4}$/gm,
        'Please enter the train number in correct format',
      ],
    },
    type: {
      type: String,
      enum: ['Rajdhani', 'Shadabdi', 'Duranto'],
      required: true,
    },
    source: {
      type: String,
      required: [true, 'Please add source station'],
    },
    destination: {
      type: String,
      required: [true, 'Please add destination station'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TrainSchema.virtual('schedule', {
  ref: 'Schedule',
  localField: '_id',
  foreignField: 'train',
  justOne: false,
});

TrainSchema.virtual('availability', {
  ref: 'Seats',
  localField: '_id',
  foreignField: 'train',
  justOne: true,
});

module.exports = mongoose.model('Train', TrainSchema);
