const AppError = require('./appError');

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === 'RangeError') {
    return res.status(400).json({
      success: false,
      name: 'RangeError',
      message: error.message,
    });
  }

  if (error.name === 'ObjectParameterError') {
    return res.status(400).json({
      success: false,
      name: 'ObjectParameterError',
      message: error.message,
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      name: 'CastError',
      message: error.message,
    });
  }

  if (error.name === 'TypeError') {
    return res.status(400).json({
      success: false,
      name: 'TypeError',
      message: error.message,
    });
  }

  if (error.name === 'MongoServerError') {
    return res.status(400).json({
      success: false,
      name: 'MongoServerError',
      message: error.message,
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      type: 'Validation Error',
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  res.status(500).json('Something went wrong');
};

module.exports = errorHandler;
