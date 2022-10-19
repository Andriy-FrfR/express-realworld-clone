class ValidationError extends Error {
  constructor(message, errorResponse) {
    super(message);
    this.errorResponse = errorResponse;
  }
}

module.exports = ValidationError;
