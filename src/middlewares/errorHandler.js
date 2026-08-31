import mongoose from 'mongoose';

export function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  res.status(500).send({ message: err.message });
}
