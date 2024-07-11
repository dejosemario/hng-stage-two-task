const ErrorWithStatus = require("./ErrorWithStatus");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.code).json({ error: { message: err.message } });
  } else {
    return res.status(500).json({ error: { message: err.message } });
  }
};


module.exports= { errorHandler };
