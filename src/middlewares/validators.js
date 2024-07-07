const Joi = require("joi");

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createOrganisationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const registerUserInOrganization = Joi.object({
  userId: Joi.string().required(),
});

module.exports = { signupSchema, loginSchema, createOrganisationSchema, registerUserInOrganization};
