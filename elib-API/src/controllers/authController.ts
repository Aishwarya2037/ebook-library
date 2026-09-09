import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// export const login = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // Find admin
//     const admin = await Admin.findOne({
//       email: email.toLowerCase().trim(),
//     });

//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Compare password with hashed password
//     const isPasswordValid = await bcrypt.compare(password, admin.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const jwtSecret = process.env.JWT_SECRET;

//     if (!jwtSecret) {
//       return res.status(500).json({
//         success: false,
//         message: "JWT_SECRET is not configured",
//       });
//     }

//     // Create JWT
//     const token = jwt.sign(
//       {
//         id: admin._id.toString(),
//         email: admin.email,
//         role: admin.role,
//       },
//       jwtSecret,
//       {
//         expiresIn: "1d",
//       },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       admin: {
//         id: admin._id,
//         email: admin.email,
//         role: admin.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin
    const normalizedEmail = email.toLowerCase().trim();

    console.log("LOGIN EMAIL:", normalizedEmail);

    const admin = await Admin.findOne({
      email: normalizedEmail,
    });

    console.log("ADMIN FOUND:", !!admin);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    console.log("PASSWORD HASH EXISTS:", !!admin.password);
    console.log("HASH START:", admin.password.substring(0, 10));

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    console.log("PASSWORD VALID:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
