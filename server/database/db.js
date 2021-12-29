import mongoose from 'mongoose';

export default class Database {
  connect = async () => {
    this.getConfig();
    try {
      await mongoose.connect(this.uri, { useNewUrlParser: true });
      console.log('Connected to MongoDB');
    } catch (error) {
      throw new Error('ERROR: Failed to connect to MongoDB');
    }
  };

  getConfig = () => {
    this.uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bolttech_test';
  };
}
