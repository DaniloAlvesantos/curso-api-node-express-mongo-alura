import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, `The book title is required`] },
    publisher: {
      type: String,
      required: [true, 'The book publisher is required'],
    },
    price: { type: Number },
    pages: { type: Number },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author',
      required: [true, `Book's author is required`],
    },
  },
  { versionKey: false },
);

const book = mongoose.model('book', bookSchema);

export default book;
