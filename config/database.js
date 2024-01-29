import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
