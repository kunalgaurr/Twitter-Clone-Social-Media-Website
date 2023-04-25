const errorHandler = require('../middleware/errorHandler');

const tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    return errorHandler(error, req, res, next);
  }
};

module.exports = tryCatch;
