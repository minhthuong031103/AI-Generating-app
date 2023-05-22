import { MongoClient } from 'mongodb';

const connectDB = async function (url) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // You can perform database operations here
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};
export default connectDB;
