import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    // Connect to the MongoDB database
    const conn = await mongoose.connect(
      process.env.MONGODB_URI!,
      {} as mongoose.ConnectOptions
    );
    console.log(
      `Database connection: ${conn.connection.host} established succussfully!`
    );
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
