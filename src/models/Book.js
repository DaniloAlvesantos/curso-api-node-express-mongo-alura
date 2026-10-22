import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, `The book title is required`] },
    publisher: {
      type: String,
      required: [true, 'The book publisher is required'],
      enum: {
        values: ['Casa do Código', 'Alura'],
        message: '{VALUE} is not a valid publisher',
      },
    },
    price: { type: Number },
    pages: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: 'The book must have between 10 and 5000 pages. Given value: {VALUE}',
      },
    },
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
