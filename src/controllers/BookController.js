import { author as Author } from '../models/Author.js';
import Book from '../models/Book.js';

class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const books = await Book.find();

      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findById(id);

      res.status(200).json({
        data: book,
        message: 'Success',
      });
    } catch (err) {
      next(err);
    }
  }

  static async createBook(req, res, next) {
    const newBook = req.body;

    try {
      const author = await Author.findById(newBook.author);
      const book = {
        ...newBook,
        author: {
          ...author._doc,
        },
      };

      await Book.create(book);

      res.status(201).json({ message: 'Success on creating book', data: book });
    } catch (err) {
      next(err);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        data: book,
        message: 'Success',
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findByIdAndDelete(id);

      res.status(200).json({
        message: 'Success on deleting',
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBooksByPublisher(req, res, next) {
    const publisher = req.query.publisher;

    try {
      const booksPerPublisher = await Book.find({
        publisher: publisher,
      });

      res.status(200).json({
        data: booksPerPublisher,
        message: 'Success',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default BookController;
