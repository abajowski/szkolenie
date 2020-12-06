class FunctionError extends Error {
  constructor (message) {
    super(message)
    this.message = `${this.constructor.name}: ${message}`
    this.name = this.constructor.name
  }
}

class BadRequestError extends FunctionError {
}

class NotFoundError extends FunctionError {
}

class InternalError extends FunctionError {
}

module.exports = {
  FunctionError,
  InternalError,
  NotFoundError,
  BadRequestError
}
