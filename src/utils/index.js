const { ValidationErrorItem } = require("sequelize");
const bcrypt = require("bcrypt");

const wrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

//used to validate the request body against the schema
const validate = (schema, body) => {
  const { error } = schema.validate(body);
  if (error) {
    const errorMessage = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    throw new Error(errorMessage);
  }
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports({
  wrapper,
  validate,
  hashPassword
});
