const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
var cors = require('cors');
const { celebrate } = require('celebrate');
require('dotenv').config();
console.log(process.env.NODE_ENV);

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const path = require('path');
// path and port
const { PORT = 3000 } = process.env;
app.use(express.static(path.join(__dirname, 'public')));
// routers
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(limiter);
app.use(requestLogger);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');
// User and Card routes
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
// Login and registration
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validate).unique().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validate).unique().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// 404 error
app.get('*', () => {
  throw new ErrorHandler(404, 'Requested resource not found');
});

// Centralized Error Handling
app.use(errorLogger);

app.use((err, req, res, next) => {
  catchError(err, res);
});
// port listener
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
