import mongoose from 'mongoose';
import { BaseError } from '../errors/BaseError.js';
import { IncorrectRequest } from '../errors/IncorrectRequest.js';
import { ValidationError } from '../errors/ValidationError.js';

export function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    return new IncorrectRequest().sendAnwser(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    return new ValidationError(err).sendAnwser(res);
  }

  return new BaseError().sendAnwser(res);
}
