// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/data/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// export default upload;

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isPdf = file.mimetype === "application/pdf";

//     return {
//       folder: "ebook-library",
//       resource_type: isPdf ? "raw" : "image",
//       format: isPdf ? "pdf" : undefined,
//       public_id: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

cloudinary.uploader
  .upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
  .then((res) => console.log("UPLOAD TEST OK:", res.secure_url))
  .catch((err) => console.error("UPLOAD TEST ERROR:", err));

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "ebook-library",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    } as any;
  },
});

const upload = multer({ storage });

export default upload;
