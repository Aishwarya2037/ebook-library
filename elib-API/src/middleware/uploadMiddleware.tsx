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

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// cloudinary.uploader
//   .upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
//   .then((res) => console.log("UPLOAD TEST OK:", res.secure_url))
//   .catch((err) => console.error("UPLOAD TEST ERROR:", err));

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "ebook-library",
//       resource_type: "auto",
//       public_id: `${Date.now()}-${file.originalname}`,
//     } as any;
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

//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       resource_type: isPdf ? "raw" : "image",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//     } as any;
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

//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",

//       resource_type: isPdf ? "raw" : "image",

//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//     };
//   },
// });

// const upload = multer({
//   storage,
// });

// export default upload;

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isPdf = file.mimetype === "application/pdf";

//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//       resource_type: isPdf ? "raw" : "image",
//     };
//   },
// });

// const upload = multer({
//   storage,
// });

// export default upload;

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// // Cover image storage
// const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       resource_type: "image",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//     };
//   },
// });

// // PDF storage
// const pdfStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       resource_type: "raw",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//     };
//   },
// });

// export const uploadImage = multer({
//   storage: imageStorage,
// });

// export const uploadPdf = multer({
//   storage: pdfStorage,
// });

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,

//   params: (req, file) => {
//     const isPdf = file.mimetype === "application/pdf";

//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       resource_type: isPdf ? "raw" : "image",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//     };
//   },
// });

// const upload = multer({
//   storage,
// });

// export default upload;

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,

//   params: async (req, file) => {
//     const isPdf = file.mimetype === "application/pdf";

//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//       resource_type: isPdf ? "raw" : "image",
//     } as any;
//   },
// });

// const upload = multer({
//   storage,
// });

// export default upload;

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,

//   params: async (req, file) => {
//     const isPdf = file.mimetype === "application/pdf";

//     console.log("FILE NAME:", file.originalname);
//     console.log("MIME TYPE:", file.mimetype);
//     console.log("IS PDF:", isPdf);

//     const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

//     return {
//       folder: "ebook-library",
//       public_id: `${Date.now()}-${originalNameWithoutExt}`,
//       resource_type: isPdf ? "raw" : "image",
//     } as any;
//   },
// });

// const upload = multer({
//   storage,
// });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    console.log("FILE NAME:", file.originalname);
    console.log("FILE MIME TYPE:", file.mimetype);
    console.log("IS PDF:", isPdf);

    const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

    return {
      folder: "ebook-library",
      public_id: `${Date.now()}-${originalNameWithoutExt}`,
      resource_type: isPdf ? "raw" : "image",
    } as any;
  },
});

// const upload = multer({
//   storage,
// });
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

export default upload;
