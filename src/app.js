const express = require("express");
const {errorHandler} = require("./middlewares/error.js");
const morgan = require('morgan');
const createSequelizeInstance = require("./config/db.js");

// Create a new express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());//
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/users", require("./routes/users"));
// app.use("/api/organizations", require("./routes/organizations"));

app.use(errorHandler);
createSequelizeInstance()


// Error handling middleware
app.all("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Export the app object
module.exports = app;
