import { BaseError } from './BaseError.js';

class IncorrectRequest extends BaseError {
  constructor(message = 'One or more given data are incorrect.') {
    super(message, 400);
  }
}

export { IncorrectRequest };
