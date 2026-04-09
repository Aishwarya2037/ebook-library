import type { Request, Response } from "express";
import Book from "../models/bookModel.js";
// import type { AuthRequest } from "../middleware/authMiddleware.js";

// CREATE BOOK
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, author } = req.body;

    // const img = req.file
    //   ? `http://localhost:3100/uploads/${req.file.filename}`
    //   : "";

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const coverImage = files.coverImage?.[0]?.filename;
    const pdfFile = files.pdfFile?.[0]?.filename;

    if (!coverImage || !pdfFile) {
      return res.status(400).json({
        message: "Both cover image and PDF are required",
      });
    }
    const book = await Book.create({
      title,
      description,
      author,
      coverImage,
      pdfFile,
      // coverImage: `/src/public/uploads/${coverImage}`,
      // pdfFile: `/src/public/uploads/${pdfFile}`,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create book",
    });
  }
};

// GET ALL BOOKS without pagination
// export const getBooks = async (req: Request, res: Response) => {
//   try {
//     // fetches all books
//     const books = await Book.find();

//     res.status(200).json({
//       books,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch books",
//     });
//   }
// };

//with pagination
export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const all = req.query.all === "true";
    const search = (req.query.search as string) || "";

    const skip = (page - 1) * limit;

    // search filter
    let query = {};

    if (search.trim()) {
      query = {
        title: { $regex: search, $options: "i" },
      };
    }

    let books;
    const totalBooks = await Book.countDocuments(query);

    // const books = await Book.find(query)
    //   .skip(skip)
    //   .limit(limit)
    //   .sort({ createdAt: -1 });

    if (all) {
      books = await Book.find(query); // fetch all books
    } else {
      const skip = (page - 1) * limit;
      books = await Book.find(query).skip(skip).limit(limit);
    }

    res.status(200).json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    });
  } catch (error: any) {
    console.error("GET BOOKS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

// GET SINGLE BOOK
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      book,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch book",
    });
  }
};

// put
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, description } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const updateData: {
      title?: string;
      author?: string;
      description?: string;
      coverImage?: string;
      pdfFile?: string;
    } = {
      title,
      author,
      description,
    };

    if (files?.coverImage?.[0]) {
      updateData.coverImage = files.coverImage[0].filename;
    }

    if (files?.pdfFile?.[0]) {
      updateData.pdfFile = files.pdfFile[0].filename;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update book",
    });
  }
};

// DELETE BOOK
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete book",
    });
  }
};
