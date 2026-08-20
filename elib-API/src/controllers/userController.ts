import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// REGISTER
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get form data
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");

      return next(error);
    }

    // check existing user
    const existingUser = await User.findOne({ email });

    // if email already found in DB (400- bad request)
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      // user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating user.",
    });
  }
};

//login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return next(createHttpError(400, "Email and password are required"));
    }

    // Find user by email
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    // Success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};
