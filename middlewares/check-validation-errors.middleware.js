const { validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorResponse = { errors: {} };

    errors.array().forEach((err) => {
      const param = err.param.split('.')[1];
      if (!errorResponse.errors[param]) {
        errorResponse.errors[param] = [];
      }

      errorResponse.errors[param].push(err.msg);
    });

    return res.status(422).json(errorResponse);
  }

  next();
};

module.exports = checkValidationErrors;
