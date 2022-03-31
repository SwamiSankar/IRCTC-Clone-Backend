const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//environment files
dotenv.config({ path: './config/config.env' });

//Route files

const train = require('./routes/trains');
const schedule = require('./routes/schedules');
const station = require('./routes/stations');
const seats = require('./routes/seats');
const ticket = require('./routes/tickets');
const auth = require('./routes/auth');

const app = express();

//Body Parser

app.use(express.json());

//Cookie Parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mongo sanitize
app.use(mongoSanitize());

//Helmet for security headers
app.use(helmet());

//To Prevent XSS Attacks
app.use(xss());

//API Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 seconds
  max: 100,
});

app.use(limiter);

//hpp (http param pollution) prevention
app.use(hpp());

//Enable CORS
app.use(cors());

//Connect to DB

connectDB();

//Mounting the routers
app.use('/irctc/v1/trains', train);
app.use('/irctc/v1/schedule', schedule);
app.use('/irctc/v1/station', station);
app.use('/irctc/v1/seats', seats);
app.use('/irctc/v1/ticket', ticket);
app.use('/irctc/v1/auth', auth);

//Error middleware (Use after mounting the router)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//Running the server
const server = app.listen(
  PORT,
  () => `Server running in ${process.env.NODE_ENV} mode on Port ${PORT} `.yellow
);

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
