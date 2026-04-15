// import dotenv from "dotenv";
// dotenv.config();
// import app from "./app.js";
// import connectDB from "./config/db.js";

// connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app.js";
// import connectDB from "./config/db.js";

// const PORT = Number(process.env.PORT) || 3100;

// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 3100;

connectDB();

console.log("ENV CHECK:", process.env.CLOUDINARY_API_KEY);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
