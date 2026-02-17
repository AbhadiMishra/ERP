import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/schoolDB";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected (Mongoose)");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
