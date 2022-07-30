const catchError = (err, res) => {
  const { code, statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    });
  } else if (code && code === 11000) {
    res.status(409).json({
      status: 'error',
      statusCode: 403,
      message: 'Email is already used',
    });
  }
};

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  ErrorHandler,
  catchError,
};