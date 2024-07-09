const authRoute = require("express").Router();
const {register } = require("../controllers/user.controller");
const {wrapper } = require("../utils/index.js");

authRoute.post("/register", wrapper(register));

module.exports = authRoute;