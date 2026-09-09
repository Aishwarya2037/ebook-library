import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!mongoUrl) {
      throw new Error("MONGO_URL is missing");
    }

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing");
    }

    await mongoose.connect(mongoUrl);

    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({
      email,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Admin creation failed:", error);
    process.exit(1);
  }
};

createAdmin();
