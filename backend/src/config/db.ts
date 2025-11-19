import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB connected successfully.");
  } catch (error) {
    console.error("DB connection error", error);
    process.exit(1);
  }
};
