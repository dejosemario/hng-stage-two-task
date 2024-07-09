const express = require("express");
const { errorHandler } = require("./middlewares/error.js");
const morgan = require("morgan");
// const organisations = require("./routes/organisation.route.js");
// const users = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");

// Create a new express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json()); //
// app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.use("/auth", authRoute);
// app.use("/users", users);
// app.use("/organisations", organisations);


app.use(errorHandler);


// Error handling middleware
app.all("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Export the app object
module.exports = app;
