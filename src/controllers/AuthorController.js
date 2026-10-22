import { NotFoundError } from '../errors/NotFoundError.js';
import { author as Author } from '../models/Author.js';

class AuthorController {
  static async getAllAuthors(req, res, next) {
    try {
      const authors = await Author.find();

      res.status(200).json(authors);
    } catch (err) {
      next(err);
    }
  }

  static async getAuthorById(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const author = await Author.findById(id);

      if (!author) throw new NotFoundError('Author not found');

      res.status(200).json({
        data: author,
        message: 'Success',
      });
    } catch (err) {
      next(err);
    }
  }

  static async createAuthor(req, res, next) {
    try {
      const newAuthor = await Author.create(req.body);
      res
        .status(201)
        .json({ message: 'Success on creating Author', data: newAuthor });
    } catch (err) {
      next(err);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const author = await Author.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        data: author,
        message: 'Success',
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const author = await Author.findByIdAndDelete(id);

      res.status(200).json({
        message: 'Success on deleting',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthorController;
