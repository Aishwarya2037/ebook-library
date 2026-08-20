// import mongoose, { Schema, Document } from "mongoose";

// export interface IBook extends Document {
//   bookName: string;
//   price: number;
//   img: string;
//   //   user: string;
// }

// const bookSchema = new Schema<IBook>(
//   {
//     bookName: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     img: {
//       type: String,
//       required: true,
//     },
//     // user: {
//     //   type: String,
//     //   required: true,
//     // },
//   },
//   { timestamps: true },
// );

// export default mongoose.model<IBook>("Book", bookSchema);

import mongoose from "mongoose";
import type { Book } from "../types/bookType.js";

const bookSchema = new mongoose.Schema<Book>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    pdfFile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Book>("Book", bookSchema);
