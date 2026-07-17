import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || "";
    // Remove leading/trailing quotes and trim whitespace
    uri = uri.trim().replace(/^["']|["']$/g, '');

    console.log("===============");
    console.log(`Cleaned URI starts with: ${uri.substring(0, 15)}...`);
    console.log("===============");

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
