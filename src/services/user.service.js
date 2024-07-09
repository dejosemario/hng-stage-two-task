const { initializeModels } = require('../models');
const Organisation = require("../models/organisation.model.js");
const { hashPassword } = require("../utils");
const jwt = require("jsonwebtoken");


const createUser = async (data) => {
  const { models } = await initializeModels();
  const { User, Organisation } = models;
  const user = await User.findOne({ where: { email: data.email } });
  if (user) {
    throw new Error("User already exists");
  }

  const password = await hashPassword(data.password);
  const newUser = await User.create({
    ...data,
    password,
  });

  // Create organisation for the user
  const organisation = await Organisation.create({
    name: `${data.firstName}'s Organisation`,
  });
  await newUser.addOrganisation(organisation);

  const accessToken = jwt.sign(
    { userId: newUser.userId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { accessToken, user: newUser };
};

module.exports = {
  createUser,
};
