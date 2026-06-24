import { author as Author} from '../models/Author.js';

class AuthorController {
  static async getAllAuthors(req, res) {
    try {
      const authors = await Author.find();

      res.status(200).json(authors);
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async getAuthorById(req, res) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const author = await Author.findById(id);

      res.status(200).json({
        data: author,
        message: 'Success',
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async createAuthor(req, res) {
    try {
      const newAuthor = await Author.create(req.body);
      res
        .status(201)
        .json({ message: 'Success on creating Author', data: newAuthor });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Error on creating a new Author`,
        error: true,
        data: null,
      });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const author = await Author.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        data: author,
        message: 'Success',
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const author = await Author.findByIdAndDelete(id);

      res.status(200).json({
        message: 'Success on deleting',
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }
}

export default AuthorController;
