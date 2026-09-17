// import express from "express";
// import {
//   createBook,
//   getBooks,
//   getBookById,
//   updateBook,
//   deleteBook,
// } from "../controllers/bookController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import upload from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// // router.post("/", protect, upload.single("img"), createBook);
// // create
// // router.post(
// //   "/",
// //   protect,
// //   upload.fields([
// //     { name: "coverImage", maxCount: 1 },
// //     { name: "pdfFile", maxCount: 1 },
// //   ]),
// //   createBook,
// // );
// router.post(
//   "/",
//   protect,
//   (req, res, next) => {
//     upload.fields([
//       { name: "coverImage", maxCount: 1 },
//       { name: "pdfFile", maxCount: 1 },
//     ])(req, res, (err: any) => {
//       if (err) {
//         console.error("UPLOAD ERROR:", err);

//         return res.status(500).json({
//           success: false,
//           message: err.message,
//           error: err,
//         });
//       }

//       next();
//     });
//   },
//   createBook,
// );

// // protected routes
// // get
// router.get("/", getBooks);
// // get by id
// router.get("/:id", getBookById);

// // update
// router.put(
//   "/:id",
//   protect,
//   upload.fields([
//     { name: "coverImage", maxCount: 1 },
//     { name: "pdfFile", maxCount: 1 },
//   ]),
//   updateBook,
// );

// // delete
// router.delete("/:id", protect, deleteBook);

// // public routes
// // router.get("/", getBooks);
// // router.get("/:id", getBookById);

// export default router;

// import express from "express";

// import {
//   createBook,
//   getBooks,
//   getBookById,
//   updateBook,
//   deleteBook,
// } from "../controllers/bookController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/adminMiddleware.js";
// import upload from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | Public Routes
// |--------------------------------------------------------------------------
// */

// // Get all books
// router.get("/", getBooks);

// // Get single book
// router.get("/:id", getBookById);

// /*
// |--------------------------------------------------------------------------
// | Admin Routes
// |--------------------------------------------------------------------------
// */

// // Create book
// router.post(
//   "/",
//   protect,
//   adminOnly,
//   (req, res, next) => {
//     upload.fields([
//       {
//         name: "coverImage",
//         maxCount: 1,
//       },
//       {
//         name: "pdfFile",
//         maxCount: 1,
//       },
//     ])(req, res, (err: any) => {
//       if (err) {
//         console.error("UPLOAD ERROR:", err);

//         return res.status(500).json({
//           success: false,
//           message: err.message,
//         });
//       }

//       next();
//     });
//   },
//   createBook,
// );

// // Update book
// router.put(
//   "/:id",
//   protect,
//   adminOnly,
//   upload.fields([
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//     {
//       name: "pdfFile",
//       maxCount: 1,
//     },
//   ]),
//   updateBook,
// );

// // Delete book
// router.delete("/:id", protect, adminOnly, deleteBook);

// export default router;

// import express from "express";
// import axios from "axios";

// import {
//   createBook,
//   getBooks,
//   getBookById,
//   updateBook,
//   deleteBook,
// } from "../controllers/bookController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/adminMiddleware.js";
// import upload from "../middleware/uploadMiddleware.js";

// import Book from "../models/bookModel.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | Public Routes
// |--------------------------------------------------------------------------
// */

// // Get all books
// router.get("/", getBooks);

// // Read PDF in browser
// router.get("/read/:id", async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);

//     if (!book || !book.pdfFile) {
//       return res.status(404).json({
//         success: false,
//         message: "PDF not found",
//       });
//     }

//     const response = await axios.get(book.pdfFile, {
//       responseType: "stream",
//     });

//     res.setHeader("Content-Type", "application/pdf");

//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename="${book.title}.pdf"`,
//     );

//     response.data.pipe(res);
//   } catch (error) {
//     console.error("PDF READ ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to open PDF",
//     });
//   }
// });

// // Get single book
// router.get("/:id", getBookById);

// /*
// |--------------------------------------------------------------------------
// | Admin Routes
// |--------------------------------------------------------------------------
// */

// // Create book
// router.post(
//   "/",
//   protect,
//   adminOnly,
//   (req, res, next) => {
//     upload.fields([
//       {
//         name: "coverImage",
//         maxCount: 1,
//       },
//       {
//         name: "pdfFile",
//         maxCount: 1,
//       },
//     ])(req, res, (err: any) => {
//       if (err) {
//         console.error("UPLOAD ERROR:", err);

//         return res.status(500).json({
//           success: false,
//           message: err.message,
//         });
//       }

//       next();
//     });
//   },
//   createBook,
// );

// // Update book
// router.put(
//   "/:id",
//   protect,
//   adminOnly,
//   upload.fields([
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//     {
//       name: "pdfFile",
//       maxCount: 1,
//     },
//   ]),
//   updateBook,
// );

// // Delete book
// router.delete("/:id", protect, adminOnly, deleteBook);

// export default router;

import express from "express";
import axios from "axios";
import Book from "../models/bookModel.js";

import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Read PDF
router.get("/read/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book || !book.pdfFile) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    const response = await axios.get(book.pdfFile, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${book.title}.pdf"`,
    );

    res.setHeader("Content-Length", response.data.length);

    // Prevent browser/mobile from using old PDF
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.send(response.data);
  } catch (error) {
    console.error("PDF READ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to open PDF",
    });
  }
});

// Get single book
router.get("/:id", getBookById);

// Create book
router.post(
  "/",
  protect,
  adminOnly,
  (req, res, next) => {
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "pdfFile", maxCount: 1 },
    ])(req, res, (err: any) => {
      if (err) {
        console.error("UPLOAD ERROR:", err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },
  createBook,
);

// Update book
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  updateBook,
);

// Delete book
router.delete("/:id", protect, adminOnly, deleteBook);

export default router;
