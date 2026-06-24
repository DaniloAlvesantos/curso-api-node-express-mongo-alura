import express from 'express';
import Books from './BooksRoutes.js';
import Authores from './AuthorsRoutes.js';

const routes = (app) => {
  app.use(express.json(), Books, Authores);
};

export default routes;
