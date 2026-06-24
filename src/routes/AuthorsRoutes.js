import express from 'express';
import AuthorController from '../controllers/AuthorController.js';

const routes = express.Router();

routes.get('/authors', AuthorController.getAllAuthors);
routes.get('/authors/:id', AuthorController.getAuthorById);
routes.post('/authors', AuthorController.createAuthor);
routes.put('/authors/:id', AuthorController.updateAuthor);
routes.delete('/authors/:id', AuthorController.deleteAuthor);

export default routes;
