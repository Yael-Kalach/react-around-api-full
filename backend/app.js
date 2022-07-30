const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { celebrate } = require('celebrate');

require('dotenv').config();
console.log(process.env.NODE_ENV);

const app = express();

// routers
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { getUserAuthSchema } = require('./utils/validators');


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
const { ErrorHandler } = require('./utils/error');
app.use(express.static(path.join(__dirname, 'public')));

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

// 404 error
app.get('*', () => {
  throw new ErrorHandler(404, 'Requested resource not found');
});

// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Login and registration
app.post('/signin', celebrate(getUserAuthSchema), login);
app.post('/signup', celebrate(getUserAuthSchema), createUser);

// Centralized Error Handling
app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
});
// port listener
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
