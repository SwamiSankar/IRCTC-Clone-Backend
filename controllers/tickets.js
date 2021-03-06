const Ticket = require('../models/Ticket');
const Passenger = require('../models/Passenger');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const RandExp = require('randexp');

//@desc    Create a ticket
//@route   POST /irctc/v1/ticket
//@access  Private

exports.createTicket = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const generatePnr = () => {
    return new RandExp(/^[2468]\d{9}$/).gen();
  };
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };
  const generateSeatNumber = () => {
    let coachId = getRandomIntInclusive(1, 5);
    let seatId = getRandomIntInclusive(1, 60);
    return `S${coachId},${seatId}`;
  };

  //   let seatArray = [];

  //loop approach
  for (let i in req.body.passengers) {
    req.body.passengers[i].seatNumber = generateSeatNumber();
  }

  //   console.log(seatArray);

  const pnr = generatePnr();

  req.body.pnr = pnr;

  const ticket = await Ticket.create(req.body);

  res.status(201).json({
    success: true,
    data: ticket,
  });
});

//@desc    View tickets booked by user
//@route   GET /irctc/v1/ticket
//@access  Private

exports.viewTickets = asyncHandler(async (req, res, next) => {
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: tickets,
  });
});

//@desc    Retrieve ticket by pnr
//@route   POST /irctc/v1/ticket/search
//@access  Public

exports.viewTicketByPNR = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.findOne({ pnr: req.body.pnr });

  res.status(200).json({
    success: true,
    data: ticket,
  });
});
