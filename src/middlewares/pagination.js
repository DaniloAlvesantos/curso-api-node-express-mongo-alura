import { IncorrectRequest } from '../errors/IncorrectRequest.js';

export async function pagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordering = '_id:-1' } = req.query;

    let [sortBy, sortOrder] = ordering.split(':');

    limit = parseInt(limit);
    page = parseInt(page);
    sortOrder = parseInt(sortOrder);

    result = req.results;

    if (limit > 0 && page > 0) {
      const books = await result
        .find()
        .sort({ [sortBy]: sortOrder }) // Sort by the specified field in the specified order
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('author')
        .exec();

      res.status(200).json(books);
    } else {
      next(new IncorrectRequest('Limit and page must be greater than 0'));
    }
  } catch (err) {
    next(err);
  }
}
