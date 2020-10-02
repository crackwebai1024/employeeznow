class AppError extends Error {
  constructor(message, statusCode) {
    //console.log('inAppError', message, statusCode);
    super(message); // extends from parents class

    this.statusCode = statusCode;
    // startsWith in js takes string - convert statusCode to string first
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // isOptional is used for bugs or programming errors that we don't want to know to users
    this.isOperational = true;
    // Create stack property (see documentation in Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
