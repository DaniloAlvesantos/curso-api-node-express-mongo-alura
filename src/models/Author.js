import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, require: true },
    nascionalidade: { type: String },
  },
  { versionKey: false },
);

const author = mongoose.model('author', authorSchema);

export { author, authorSchema };
