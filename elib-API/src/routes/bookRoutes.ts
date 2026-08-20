import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// router.post("/", protect, upload.single("img"), createBook);
// create
// router.post(
//   "/",
//   protect,
//   upload.fields([
//     { name: "coverImage", maxCount: 1 },
//     { name: "pdfFile", maxCount: 1 },
//   ]),
//   createBook,
// );
router.post(
  "/",
  protect,
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
          error: err,
        });
      }

      next();
    });
  },
  createBook,
);

// protected routes
// get
router.get("/", getBooks);
// get by id
router.get("/:id", getBookById);

// update
router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  updateBook,
);

// delete
router.delete("/:id", protect, deleteBook);

// public routes
// router.get("/", getBooks);
// router.get("/:id", getBookById);

export default router;
