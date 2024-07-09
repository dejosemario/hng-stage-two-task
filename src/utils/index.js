const { ValidationErrorItem } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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
      field: err.context ? err.context.key : null,
      message: err.message,
    }));
    throw new Error(JSON.stringify(errorMessage));
  }
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  wrapper,
  validate,
  hashPassword,
  generateToken,
};
