import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import path from "node:path";

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public/data/uploads")),
);

app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);

export default app;
