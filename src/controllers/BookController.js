import { author as Author } from '../models/Author.js';
import Book from '../models/Book.js';

class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const books = Book.find();
      req.results = books;
      next();
    } catch (err) {
      next(err);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error('ID is required');

      const book = await Book.findById(id).populate('author');

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

      const book = await Book.findByIdAndUpdate(id, req.body).populate(
        'author',
      );

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

      const book = await Book.findByIdAndDelete(id).populate('author');

      res.status(200).json({
        message: 'Success on deleting',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBooksByPublisher(req, res, next) {
    // const regex = new RegExp(title, 'i'); // i for ignore case insensitive
    const search = await handleSearchQuery(req.query);

    try {
      const booksPerPublisher = Book.find(search).populate('author');

      req.results = booksPerPublisher;

      next();
    } catch (err) {
      next(err);
    }
  }
}

async function handleSearchQuery(query) {
  const search = {};

  if (query.publisher) search.publisher = query.publisher;
  if (query.title) search.title = { $regex: query.title, $options: 'i' }; // Using mongoDB operators for regex search
  if (query.minPages || query.maxPages) search.pages = {};
  if (query.minPages) search.pages.$gte = parseInt(query.minPages);
  if (query.maxPages) search.pages.$lte = parseInt(query.maxPages);
  if (query.author) {
    const author = await Author.findOne({ name: query.author });

    const authorId = author ? author._id : null;

    if (authorId) search.author = authorId;
  }

  return search;
}

export default BookController;
