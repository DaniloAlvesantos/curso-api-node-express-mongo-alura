import express from 'express';
import BookController from '../controllers/BookController.js';
import { pagination } from '../middlewares/pagination.js';

const routes = express.Router();

/**
 * The routes must be sorted by complexity (from most specific to most generic).
 * Because Express evaluates routes sequentially in the order they are defined,
 * a generic route with a parameter (like /:id) will intercept requests meant
 * for a more specific static route (like /search) if placed before it.
 */
routes.get('/books', BookController.getAllBooks, pagination);
routes.get('/books/search', BookController.getBooksByPublisher, pagination);
routes.get('/books/:id', BookController.getBookById);

routes.post('/books', BookController.createBook);

routes.put('/books/:id', BookController.updateBook);

routes.delete('/books/:id', BookController.deleteBook);

export default routes;
