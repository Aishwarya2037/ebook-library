import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// REGISTER
// export const registerUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     // get form data
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       const error = createHttpError(400, "All fields are required");

//       return next(error);
//     }

//     // check existing user
//     const existingUser = await User.findOne({ email });

//     // if email already found in DB (400- bad request)
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists with this email",
//       });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       // user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error while creating user.",
//     });
//   }
// };

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user
    // const user = await User.findOne({ email });

    // if (!user) {
    //   return res.status(400).json({
    //     message: "Invalid email or password",
    //   });
    // }

    // ✅ ADMIN CHECK (IMPORTANT)
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "123456";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(403).json({
        message: "Only admin can access dashboard",
      });
    }

    // compare password
    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   return res.status(400).json({
    //     message: "Invalid email or password",
    //   });
    // }

    // create token
    const token = jwt.sign(
      // payload
      {
        // id: user._id,
        email: ADMIN_EMAIL,
      },
      // secret key
      process.env.JWT_SECRET as string,
      // expiry
      {
        expiresIn: "7d",
      },
    );

    // success response
    res.status(200).json({
      message: "Login successful",
      token,
      // user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};
