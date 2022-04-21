const mongoose = require('mongoose');
const Passenger = require('./Passenger').schema;
const Seats = require('./Availability');
const arrayLimit = (val) => {
  return val.length <= 6;
};
const TicketSchema = new mongoose.Schema({
  pnr: {
    type: String,
    required: true,
    match: [/^[2468]\d{9}$/gm, 'PNR not in correct format'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  train: {
    type: mongoose.Schema.ObjectId,
    ref: 'Train',
    required: true,
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'Station',
    required: true,
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'Station',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  passengers: {
    type: [Passenger],
    required: true,
    validate: [arrayLimit, 'List exceeds count of 6'],
  },
});

TicketSchema.pre('save', async function (next) {
  console.log(`Availability is reduced by ${this.passengers.length}`);
  let availabilityObject = await Seats.findOne({
    train: this.train,
    date: this.date,
  });

  let availability = availabilityObject.seats;

  let id = availabilityObject._id;

  availabilityObject = await Seats.findByIdAndUpdate(
    id,
    {
      seats: availability - this.passengers.length,
    },
    { new: true, runValidators: true }
  );

  next();
});

TicketSchema.pre('remove', async function (next) {
  console.log(`Availability is increased by ${this.passengers.length}`);
  let availabilityObject = await Seats.findOne({
    train: this.train,
    date: this.date,
  });

  let availability = availabilityObject.seats;

  let id = availabilityObject._id;

  availabilityObject = await Seats.findByIdAndUpdate(
    id,
    {
      seats: availability + this.passengers.length,
    },
    { new: true, runValidators: true }
  );

  next();
});

module.exports = mongoose.model('Ticket', TicketSchema);
