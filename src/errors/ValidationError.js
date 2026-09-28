import { IncorrectRequest } from './IncorrectRequest.js';

class ValidationError extends IncorrectRequest {
  constructor(err) {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join('; ');

    super(`The following errors was found: ${message}`);
  }
}

export { ValidationError };
