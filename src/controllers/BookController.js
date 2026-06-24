import { author as Author } from '../models/Author.js';
import Book from '../models/Book.js';

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await Book.find();

      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async getBookById(req, res) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findById(id);

      res.status(200).json({
        data: book,
        message: 'Success',
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async createBook(req, res) {
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
      res.status(500).json({
        message: `${err.message} - Error on creating a new book`,
        error: true,
        data: null,
      });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        data: book,
        message: 'Success',
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findByIdAndDelete(id);

      res.status(200).json({
        message: 'Success on deleting',
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }

  static async getBooksByPublisher(req, res) {
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
      res.status(500).json({
        message: `${err.message} - Request Error`,
      });
    }
  }
}

export default BookController;
