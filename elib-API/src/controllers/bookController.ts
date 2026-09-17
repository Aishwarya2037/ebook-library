import type { Request, Response } from "express";
import Book from "../models/bookModel.js";
import cloudinary from "../config/cloudinary.js";

// Extract Cloudinary public ID from URL
const getCloudinaryPublicId = (url: string, resourceType: "image" | "raw") => {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split("/");

    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      return null;
    }

    let publicIdParts = parts.slice(uploadIndex + 1);

    // Remove Cloudinary version
    if (publicIdParts[0] && /^v\d+$/.test(publicIdParts[0])) {
      publicIdParts.shift();
    }

    let publicId = publicIdParts.join("/");

    // For images, remove extension
    if (resourceType === "image") {
      publicId = publicId.replace(/\.[^/.]+$/, "");
    }

    return publicId;
  } catch (error) {
    console.error("PUBLIC ID EXTRACTION ERROR:", error);
    return null;
  }
};

// CREATE BOOK
// export const createBook = async (req: Request, res: Response) => {
//   try {
//     const { title, description, author } = req.body;

//     const files = req.files as {
//       [fieldname: string]: Express.Multer.File[];
//     };

//     const coverImageFile = files?.coverImage?.[0];
//     const pdfFileUpload = files?.pdfFile?.[0];

//     if (!coverImageFile || !pdfFileUpload) {
//       return res.status(400).json({
//         message: "Both cover image and PDF are required",
//       });
//     }

//     console.log("COVER URL:", coverImageFile.path);
//     console.log("COVER FILENAME:", coverImageFile.filename);

//     console.log("PDF URL:", pdfFileUpload.path);
//     console.log("PDF FILENAME:", pdfFileUpload.filename);

//     const book = await Book.create({
//       title,
//       description,
//       author,

//       coverImage: coverImageFile.path,
//       pdfFile: pdfFileUpload.path,

//       coverImagePublicId: coverImageFile.filename,
//       pdfFilePublicId: pdfFileUpload.filename,
//     });

//     return res.status(201).json({
//       message: "Book created successfully",
//       book,
//     });
//   } catch (error: any) {
//     console.error("CREATE BOOK ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const createBook = async (req: Request, res: Response) => {
  try {
    console.log("========== CREATE BOOK ==========");
    console.log("BODY:", req.body);

    const { title, description, author } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const coverImageFile = files?.coverImage?.[0];
    const pdfFileUpload = files?.pdfFile?.[0];

    if (!coverImageFile || !pdfFileUpload) {
      return res.status(400).json({
        message: "Both cover image and PDF are required",
      });
    }

    console.log("COVER URL:", coverImageFile.path);
    console.log("PDF URL:", pdfFileUpload.path);

    const book = await Book.create({
      title,
      description,
      author,
      coverImage: coverImageFile.path,
      pdfFile: pdfFileUpload.path,
      coverImagePublicId: coverImageFile.filename,
      pdfFilePublicId: pdfFileUpload.filename,
    });

    console.log("BOOK SAVED TO MONGODB:", book);

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error: any) {
    console.error("CREATE BOOK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BOOKS
export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const all = req.query.all === "true";
    const search = (req.query.search as string) || "";

    const skip = (page - 1) * limit;

    let query: Record<string, any> = {};

    if (search.trim()) {
      query = {
        title: {
          $regex: search,
          $options: "i",
        },
      };
    }

    const totalBooks = await Book.countDocuments(query);

    let books;

    if (all) {
      books = await Book.find(query).sort({
        createdAt: -1,
      });
    } else {
      books = await Book.find(query).skip(skip).limit(limit).sort({
        createdAt: -1,
      });
    }

    return res.status(200).json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    });
  } catch (error: any) {
    console.error("GET BOOKS ERROR:", error);

    return res.status(500).json({
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

    return res.status(200).json({
      book,
    });
  } catch (error: any) {
    console.error("GET BOOK ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch book",
      error: error.message,
    });
  }
};

// UPDATE BOOK
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, description } = req.body;

    const existingBook = await Book.findById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const coverImageFile = files?.coverImage?.[0];
    const pdfFileUpload = files?.pdfFile?.[0];

    const updateData: any = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (author !== undefined) {
      updateData.author = author;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    // New cover image
    if (coverImageFile) {
      if (existingBook.coverImage) {
        const oldPublicId = getCloudinaryPublicId(
          existingBook.coverImage,
          "image",
        );

        console.log("OLD COVER PUBLIC ID:", oldPublicId);

        if (oldPublicId) {
          const result = await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: "image",
          });

          console.log("OLD COVER DELETE RESULT:", result);
        }
      }

      updateData.coverImage = coverImageFile.path;

      updateData.coverImagePublicId = getCloudinaryPublicId(
        coverImageFile.path,
        "image",
      );
    }

    // New PDF
    // if (pdfFileUpload) {
    //   if (existingBook.pdfFile) {
    //     const oldPdfPublicId = getCloudinaryPublicId(
    //       existingBook.pdfFile,
    //       "raw",
    //     );

    //     console.log("OLD PDF PUBLIC ID:", oldPdfPublicId);

    //     if (oldPdfPublicId) {
    //       const result = await cloudinary.uploader.destroy(oldPdfPublicId, {
    //         resource_type: "raw",
    //       });

    //       console.log("OLD PDF DELETE RESULT:", result);
    //     }
    //   }

    //   updateData.pdfFile = pdfFileUpload.path;

    //   updateData.pdfFilePublicId = getCloudinaryPublicId(
    //     pdfFileUpload.path,
    //     "raw",
    //   );
    // }

    // New PDF
    // New PDF
    if (pdfFileUpload) {
      console.log("========== NEW PDF UPDATE ==========");
      console.log("NEW PDF URL:", pdfFileUpload.path);
      console.log("NEW PDF PUBLIC ID:", pdfFileUpload.filename);
      console.log("OLD PDF PUBLIC ID:", existingBook.pdfFilePublicId);

      // Delete old PDF from Cloudinary
      if (existingBook.pdfFilePublicId) {
        const deleteResult = await cloudinary.uploader.destroy(
          existingBook.pdfFilePublicId,
          {
            resource_type: "raw",
            type: "upload",
            invalidate: true,
          },
        );

        console.log("OLD PDF DELETE RESULT:", deleteResult);
      }

      // Save new PDF information
      updateData.pdfFile = pdfFileUpload.path;
      updateData.pdfFilePublicId = pdfFileUpload.filename;

      console.log("NEW PDF SAVED FOR UPDATE:", updateData.pdfFile);
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error: any) {
    console.error("UPDATE BOOK ERROR:", error);

    return res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// DELETE BOOK
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find book
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    console.log("========== DELETE BOOK ==========");
    console.log("Book ID:", id);
    console.log("Cover Public ID:", book.coverImagePublicId);
    console.log("PDF Public ID:", book.pdfFilePublicId);

    // --------------------------------
    // DELETE COVER IMAGE
    // --------------------------------

    if (book.coverImagePublicId) {
      const coverResult = await cloudinary.uploader.destroy(
        book.coverImagePublicId,
        {
          resource_type: "image",
          type: "upload",
          invalidate: true,
        },
      );

      console.log("COVER DELETE RESULT:", coverResult);
    }

    // --------------------------------
    // DELETE PDF
    // --------------------------------

    if (book.pdfFilePublicId) {
      const pdfResult = await cloudinary.uploader.destroy(
        book.pdfFilePublicId,
        {
          resource_type: "raw",
          type: "upload",
          invalidate: true,
        },
      );

      console.log("PDF DELETE RESULT:", pdfResult);
    }

    // --------------------------------
    // DELETE FROM MONGODB
    // --------------------------------

    await Book.findByIdAndDelete(id);

    console.log("MongoDB book deleted");

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE BOOK ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
