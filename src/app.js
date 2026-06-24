import express from 'express';
import connectToDatabase from './config/dbConnect.js';
import Book from './models/Book.js';
import routes from './routes/index.js';

const conn = await connectToDatabase();

conn.on('error', console.log.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log('Connected to database');
});

const app = express();
app.use(express.json());
routes(app);

app.get('/', (req, res) => {
  res.status(200).send('Curso de node.js');
});

export default app;
