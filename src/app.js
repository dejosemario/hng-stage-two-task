const express = require("express");

// import logger from "./config/Logger.js";
// Create a new express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

// app.use(errorHandler);


// Error handling middleware
app.all("*", (req, res) => {
  // logger.error('Error', {
  //   method: req.method,
  //   url: req.originalUrl,
  //   ip: req.ip,
  //   status: res.status,
  //   user: req.user ? req.user.id : 'Guest',
  // });
  res.status(404).json({
    success: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});


// Export the app object
module.exports = app;
