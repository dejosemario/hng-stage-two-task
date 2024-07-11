class ErrorWithStatus extends Error {
  constructor(message, status, success = false) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

class BadRequestError extends ErrorWithStatus {
  constructor(message) {
    super(message, "Bad Request", 400);
  }
}

class UnauthorizedError extends ErrorWithStatus {
  constructor(message) {
    super(message, "Unauthorized", 401);
  }
}

class ForbiddenError extends ErrorWithStatus {
  constructor(message) {
    super(message, "Forbidden", 403);
  }
}

class NotFoundError extends ErrorWithStatus {
  constructor(message) {
    super(message, "Not Found", 404);
  }
}

class InvalidInputError extends ErrorWithStatus {
  constructor(message) {
    super(message, "Invalid Input", 422);
  }
}

class ValdiationError extends Error{
  constructor(status, message, code){
    super() //
    this.status  = "Bad request";
    this.message = "Registration unsuccessful";
    this.statusCode = 400;
    this.message = {
     status:  this.status,
     message: this.message,
      statusCode: this.statusCode
    }
    this.name = this.constructor.name;
  }

}

module.exports = ErrorWithStatus, { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InvalidInputError};

