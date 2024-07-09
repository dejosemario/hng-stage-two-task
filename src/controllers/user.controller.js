const { registerSchema, loginSchmea } = require("../middlewares/validators.js");
const { validate } = require("../utils/index.js");
const userService = require("../services/user.service.js");

const register = async (req, res) => {
  validate(registerSchema, req.body);
  const { accessToken, user } = await userService.createUser(req.body);
  res.status(201).json({
    status: "sucess",
    message: "Registration successful",
    data: {
      accessToken,
      user,
    },
  });
};

module.exports = {
  register,
};
