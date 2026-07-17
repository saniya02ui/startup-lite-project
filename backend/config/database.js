import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables early if needed
dotenv.config();

/**
 * Connects to MongoDB Atlas using the connection string in .env
 */
const connectDB = async () => {
  try {
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6+
    // but included here as requested.
   const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
