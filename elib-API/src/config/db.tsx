import mongoose from "mongoose";

const connectDB = async () => {
  console.log("MONGO URL exists:", !!process.env.MONGO_URL);
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
