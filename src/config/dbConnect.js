import mongoose from 'mongoose';

async function connectToDatabase() {
  mongoose.connect(process.env.DB_STRING);

  return mongoose.connection;
}

export default connectToDatabase;
